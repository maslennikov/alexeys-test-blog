import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../../../schema'
import {IParams, schema as getSchema} from './get'

export const schema: FastifySchema = {
  params: getSchema.params,

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
    const {id} = req.params

    const post = await fastify.prisma.post.delete({
      where: {id},
    })

    return {post}
  })
}

export default route
