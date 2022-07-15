import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {IParams, schema as deleteSchema} from './delete'
import {postResponse} from '../../../schema'

export interface IBody {
  published: boolean
}

export const schema: FastifySchema = {
  params: deleteSchema?.params,

  body: S.object().prop('published', S.boolean()),

  response: {
    200: S.object().prop('post', postResponse.only(['id', 'publishedAt'])),
  },

  security: [{bearerAuth: []}],
  tags: ['publisher'],
  summary: 'Publish or unpublish the post',
  description: `
  When publishing, current date is applied as publish date.`,
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
      data: {publishedAt: published ? new Date() : null},
      select: {id: true, publishedAt: true},
    })

    return {post}
  })
}

export default route
