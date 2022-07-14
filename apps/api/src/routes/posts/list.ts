import type {Prisma} from '@prisma/client'

import {FastifyPluginAsync, RouteShorthandOptions} from 'fastify'
import S from 'fluent-json-schema'
import {postResponse} from './schema'

export interface IListQuerystring {
  skip: number | null
  take: number | null
  // orderBy: Prisma.SortOrder | null
}

export const schema: RouteShorthandOptions['schema'] = {
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
    Querystring: IListQuerystring
  }>('/', {schema}, async (req, rep) => {
    const posts = await fastify.prisma.post.findMany({
      where: {published: true},
      select: {
        id: true,
        title: true,
        author: true,
      },
    })
    return {total: posts.length, posts}
  })
}

export default route
