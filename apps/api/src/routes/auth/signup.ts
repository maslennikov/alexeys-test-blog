import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {hash} from '../../utils/password'
import {userResponse} from '../schema'

export interface IBody {
  password: string
  email: string
  name: string
}

export const schema: FastifySchema = {
  body: S.object() //
    .prop('password', S.string().required())
    .prop('email', S.string().required())
    .prop('name', S.string().required()),

  response: {
    200: S.object().prop('user', userResponse),
  },

  tags: ['auth'],
  summary: 'Register a user',
  description: `
  User will be created with a blog instance named by provided name.

  **JWT will not be issued automatically, use \`login\` call with same credentials**`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Body: IBody
  }>('/signup', {schema}, async (req, rep) => {
    const {email, password, name} = req.body

    const exists = await fastify.prisma.user.count({
      where: {email},
    })
    if (exists) return rep.badRequest('User with given email already exists')

    const user = await fastify.prisma.user.create({
      data: {
        email,
        pwdHash: await hash(password),
        blog: {
          create: {name},
        },
      },
      select: {
        id: true,
        email: true,
        blog: {select: {id: true}},
      },
    })

    return {user}
  })
}

export default route
