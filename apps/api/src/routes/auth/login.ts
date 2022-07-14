import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'

export interface IBody {
  password: string
  email: string
}

export const schema: RouteShorthandOptions['schema'] = {
  body: S.object() //
    .prop('password', S.string().required())
    .prop('email', S.string().required()),

  response: {
    200: S.object().prop('jwt', S.string()),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Body: IBody
  }>('/login', {schema}, async (req, rep) => {
    const {email, password} = req.body

    // TODO implement password flow
    const user = await fastify.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        blog: {select: {id: true}},
      },
    })

    if (!user) return rep.notFound()

    const jwt = fastify.jwt.sign({user})
    return {jwt}
  })
}

export default route
