import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../../../schema'

export interface IParams {
  id: number
  blogId: number
}

export interface IBody {
  published: boolean
}

export const schema: FastifySchema = {
  params: S.object()
    .prop('id', S.number()) //
    .prop('blogId', S.number()),

  response: {
    200: S.object().prop('post', postResponse),
  },

  security: [{bearerAuth: []}],
  tags: ['publisher'],
  summary: 'Get a post from this blog',
  description: `
  Gets any existing post

  **Request for any post not from this blog will fail with not authorized**`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Params: IParams
    Body: IBody
  }>('/:id', {schema}, async (req, rep) => {
    const {id} = req.params

    const post = await fastify.prisma.post.findUnique({
      where: {id},
    })

    return {post}
  })
}

export default route
