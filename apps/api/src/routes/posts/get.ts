import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../schema'

export interface IGetParams {
  id: number
}

export const schema: RouteShorthandOptions['schema'] = {
  params: S.object().prop('id', S.number()),
  response: {
    200: S.object().prop('post', postResponse),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Params: IGetParams
  }>('/:id', {schema}, async (req, rep) => {
    const {id} = req.params

    const post = await fastify.prisma.post.findUnique({
      where: {id},
      include: {blog: true},
    })
    return post ? {post} : rep.notFound()
  })
}

export default route
