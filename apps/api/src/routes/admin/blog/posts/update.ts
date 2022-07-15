import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {IParams, schema as getSchema} from './get'
import {IBody, schema as createSchema} from './create'
import {postResponse} from '../../../schema'

export const schema: FastifySchema = {
  params: getSchema.params,
  body: createSchema.body,

  response: {
    200: S.object().prop('post', postResponse),
  },

  security: [{bearerAuth: []}],
  tags: ['publisher'],
  summary: 'Edit the post',
  description: `
  Editing does not affect published status of the post`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.put<{
    Params: IParams
    Body: IBody
  }>('/:id', {schema}, async (req, rep) => {
    const {id, blogId} = req.params
    const {title, content} = req.body

    const res = await fastify.prisma.post.findUnique({
      where: {id},
      select: {blogId: true},
    })

    if (!res) return rep.notFound()
    if (res.blogId != blogId)
      return rep.unauthorized('Post belongs to another blog')

    const post = await fastify.prisma.post.update({
      where: {id},
      data: {title, content},
    })

    return {post}
  })
}

export default route
