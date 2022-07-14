import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {IGetParams, schema as getSchema} from './get'
import {postResponse} from './schema'

export interface IPublishBody {
  published: boolean
}

export const schema: RouteShorthandOptions['schema'] = {
  params: getSchema?.params,
  body: S.object().prop('published', S.boolean()),
  response: {
    200: S.object().prop('post', postResponse),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.put<{
    Params: IGetParams
    Body: IPublishBody
  }>('/publish/:id', {schema}, async (req, rep) => {
    const {id} = req.params
    const {published} = req.body

    const post = await fastify.prisma.post.update({
      where: {id},
      data: {published},
    })

    return post ? {post} : rep.notFound
  })
}

export default route
