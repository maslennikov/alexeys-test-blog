import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../../../schema'

export interface IParams {
  blogId: number
}

export interface IQuerystring {
  skip: number | null
  take: number | null
  // orderBy: Prisma.SortOrder | null
}

export const schema: RouteShorthandOptions['schema'] = {
  params: S.object().prop('blogId', S.number()),

  querystring: S.object() //
    .prop('skip', S.number())
    .prop('take', S.number()),

  response: {
    200: S.object() //
      .prop('total', S.number())
      .prop('posts', S.array().items(postResponse)),
  },
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Params: IParams
    Querystring: IQuerystring
  }>('/', {schema}, async (req, rep) => {
    const {blogId} = req.params

    const posts = await fastify.prisma.post.findMany({
      where: {blogId},
      select: {
        id: true,
        title: true,
        published: true,
      },
    })
    return {total: posts.length, posts}
  })
}

export default route
