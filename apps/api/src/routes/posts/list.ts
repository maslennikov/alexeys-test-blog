import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from '../schema'

export interface IListQuerystring {
  skip: number | null
  take: number | null
  // orderBy: Prisma.SortOrder | null
}

export const schema: FastifySchema = {
  querystring: S.object()
    .prop(
      'skip', //
      S.number().description('Skip first N entries')
    )
    .prop(
      'take', //
      S.number()
        .minimum(1)
        .maximum(100)
        .default(10)
        .description('Limit response to N results.')
    ),

  response: {
    200: S.object() //
      .prop('total', S.number())
      .prop(
        'posts',
        S.array().items(postResponse.without(['content', 'createdAt']))
      ),
  },

  tags: ['reader'],
  summary: 'Get recent published posts from all blogs',
  description: `
  Posts will be sorted starting from newest publish date. **Default page limit is applied.**

  *Unpublished posts will be omitted*`,
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: IListQuerystring
  }>('/', {schema}, async (req, rep) => {
    const {skip, take} = req?.query

    const total = await fastify.prisma.post.count({
      where: {NOT: {publishedAt: null}},
    })

    const posts = await fastify.prisma.post.findMany({
      where: {NOT: {publishedAt: null}},
      take: take || undefined,
      skip: skip || undefined,
      orderBy: {publishedAt: 'desc'},
      select: {
        id: true,
        title: true,
        summary: true,
        publishedAt: true,
        blog: true,
      },
    })
    return {total, posts}
  })
}

export default route
