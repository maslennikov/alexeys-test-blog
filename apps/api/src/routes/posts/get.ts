import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../schema'

export interface IGetParams {
  id: number
}

export const schema: FastifySchema = {
  params: S.object().prop('id', S.number()),
  response: {
    200: S.object().prop('post', postResponse.without(['createdAt'])),
  },
  tags: ['reader'],
  summary: 'Get a published post',
  description: `
  **Request for an unpublished post will fail with 404**`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Params: IGetParams
  }>('/:id', {schema}, async (req, rep) => {
    const {id} = req.params

    const post = await fastify.prisma.post.findFirst({
      where: {
        id,
        NOT: {publishedAt: null},
      },
      include: {blog: true},
    })
    return post ? {post} : rep.notFound()
  })
}

export default route
