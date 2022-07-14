import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {IParams, schema as deleteSchema} from './delete'
import {postResponse} from '../../../schema'

export interface IBody {
  published: boolean
}

export const schema: RouteShorthandOptions['schema'] = {
  params: deleteSchema?.params,
  body: S.object().prop('published', S.boolean()),
  response: {
    200: S.object().prop('post', postResponse),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.put<{
    Params: IParams
    Body: IBody
  }>('/publish/:id', {schema}, async (req, rep) => {
    const {id, blogId} = req.params
    const {published} = req.body

    const res = await fastify.prisma.post.findUnique({
      where: {id},
      select: {blogId: true},
    })

    if (!res) return rep.notFound()
    if (res.blogId != blogId)
      return rep.unauthorized('Post belongs to another blog')

    const post = await fastify.prisma.post.update({
      where: {id},
      data: {published},
    })

    return {post}
  })
}

export default route
