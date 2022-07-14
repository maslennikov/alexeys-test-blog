import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {IGetParams, schema as getSchema} from './get'
import {postResponse} from './schema'

export const schema: RouteShorthandOptions['schema'] = {
  params: getSchema?.params,
  response: {
    200: S.object().prop('post', postResponse),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.delete<{
    Params: IGetParams
  }>('/:id', {schema}, async (req, rep) => {
    const {id} = req.params

    const post = await fastify.prisma.post.delete({
      where: {id},
    })

    return post ? {post} : rep.notFound
  })
}

export default route
