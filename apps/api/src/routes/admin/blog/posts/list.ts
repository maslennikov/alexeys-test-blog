import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../../../schema'
import {schema as publicListSchema} from '../../../posts/list'

export interface IParams {
  blogId: number
}

export interface IQuerystring {
  skip: number | null
  take: number | null
  // orderBy: Prisma.SortOrder | null
}

export const schema: FastifySchema = {
  params: S.object().prop('blogId', S.number()),

  querystring: publicListSchema.querystring,

  response: {
    200: S.object() //
      .prop('total', S.number())
      .prop('posts', S.array().items(postResponse.without(['content']))),
  },

  security: [{bearerAuth: []}],
  tags: ['publisher'],
  summary: 'Get all posts from this blog',
  description: `
  Posts will be sorted starting from newest *creation* date. **Default page limit is applied.**

  *Unpublished posts will be included in results list*`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Params: IParams
    Querystring: IQuerystring
  }>('/', {schema}, async (req, rep) => {
    const {blogId} = req.params
    const {skip, take} = req?.query

    const posts = await fastify.prisma.post.findMany({
      where: {blogId},
      take: take || undefined,
      skip: skip || undefined,
      orderBy: [{createdAt: 'desc'}],
      select: {
        id: true,
        title: true,
        createdAt: true,
        publishedAt: true,
      },
    })
    return {total: posts.length, posts}
  })
}

export default route
