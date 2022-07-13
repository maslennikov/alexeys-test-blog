import {FastifyPluginAsync} from 'fastify'
import sensibleDecoratorsPlugin from './plugins/sensible'
import prismaPlugin from './plugins/prisma'

import healthcheck from './routes/healthcheck'
import posts from './routes/posts'

export type AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify.register(sensibleDecoratorsPlugin)
  fastify.register(prismaPlugin)

  fastify.register(healthcheck, {prefix: '/_app'})
  fastify.register(posts, {prefix: '/posts'})
}

export default app
