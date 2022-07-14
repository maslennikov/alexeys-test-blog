import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {hash} from '../../utils/password'
import {userResponse} from '../schema'

export interface IBody {
  password: string
  email: string
}

export const schema: RouteShorthandOptions['schema'] = {
  body: S.object() //
    .prop('password', S.string().required())
    .prop('email', S.string().required()),

  response: {
    200: S.object().prop('user', userResponse),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Body: IBody
  }>('/signup', {schema}, async (req, rep) => {
    const {email, password} = req.body

    const exists = await fastify.prisma.user.count({
      where: {email},
    })
    if (exists) return rep.badRequest('User with given email already exists')

    const user = await fastify.prisma.user.create({
      data: {
        email,
        pwdHash: await hash(password),
        blog: {
          create: {
            name: 'My Blog',
          },
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
