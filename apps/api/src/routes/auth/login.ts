import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {verify} from '../../utils/password'

export interface IBody {
  password: string
  email: string
}

export const schema: FastifySchema = {
  body: S.object() //
    .prop('password', S.string().required())
    .prop('email', S.string().required()),

  response: {
    200: S.object().prop('jwt', S.string()),
  },

  tags: ['auth'],
  summary: 'Exchange credentials for a JWT token',
  description: `
  Apply received JWT token to \`Authorization\` bearer header.

  **No cookie will be set**`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Body: IBody
  }>('/login', {schema}, async (req, rep) => {
    const {email, password} = req.body

    const result = await fastify.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        pwdHash: true,
        blog: {select: {id: true}},
      },
    })

    if (!result) return rep.notFound()

    const {pwdHash, ...user} = result
    const authorized = await verify(password, pwdHash)
    if (!authorized) return rep.unauthorized()

    const jwt = fastify.jwt.sign({user})
    return {jwt}
  })
}

export default route
