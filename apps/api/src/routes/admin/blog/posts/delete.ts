import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../../../schema'

export interface IParams {
  id: number
  blogId: number
}

export const schema: FastifySchema = {
  params: S.object()
    .prop('id', S.number()) //
    .prop('blogId', S.number()),

  response: {
    200: S.object()
      .prop('post', postResponse)
      .description('Body of a deleted post'),
  },

  security: [{bearerAuth: []}],
  tags: ['publisher'],
  summary: 'Delete the post',
  description: `
  On success, deleted post data will be returned in response.

  **Post data will be deleted permanently**`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.delete<{
    Params: IParams
  }>('/:id', {schema}, async (req, rep) => {
    const {id, blogId} = req.params

    const res = await fastify.prisma.post.findUnique({
      where: {id},
      select: {blogId: true},
    })

    if (!res) return rep.notFound()
    if (res.blogId != blogId)
      return rep.unauthorized('Post belongs to another blog')

    const post = await fastify.prisma.post.delete({
      where: {id},
    })

    return {post}
  })
}

export default route
