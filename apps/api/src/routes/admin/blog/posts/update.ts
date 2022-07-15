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
    const {id} = req.params
    const {title, content} = req.body

    const post = await fastify.prisma.post.update({
      where: {id},
      data: {title, content},
    })

    return {post}
  })
}

export default route
