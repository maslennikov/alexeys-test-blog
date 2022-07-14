import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from './schema'

export interface ICreateBody {
  title: string
  content: string
}

export const schema: RouteShorthandOptions['schema'] = {
  body: postResponse.only(['title', 'content']),
  response: {
    200: S.object().prop('post', postResponse),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Body: ICreateBody
  }>(`/`, {schema}, async (req, rep) => {
    const {title, content} = req.body
    // TODO fix when auth is implemented
    const authorId = 1

    const post = await fastify.prisma.post.create({
      data: {
        title,
        content,
        author: {connect: {id: authorId}},
      },
    })

    return {post}
  })
}

export default route
