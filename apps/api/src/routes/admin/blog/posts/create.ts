import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../../../schema'

export interface IParams {
  blogId: number
}

export interface IBody {
  title: string
  content: string
}

export const schema: FastifySchema = {
  params: S.object().prop('blogId', S.number()),

  body: postResponse
    .only(['title', 'content']) //
    .required(['title', 'content']),

  response: {
    200: S.object().prop('post', postResponse),
  },

  security: [{bearerAuth: []}],
  tags: ['publisher'],
  summary: 'Create a post in this blog',
  description: `
  Created post will have an unpublished state.

  **Invoke \`publish\` endpoint explicitly to publish**`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Params: IParams
    Body: IBody
  }>('/', {schema}, async (req, rep) => {
    const {blogId} = req.params
    const {title, content} = req.body

    const post = await fastify.prisma.post.create({
      data: {
        title,
        content,
        blog: {connect: {id: blogId}},
      },
    })

    return {post}
  })
}

export default route
