import {FastifyPluginAsync} from 'fastify'
import sensibleDecoratorsPlugin from './plugins/sensible'
import prismaPlugin from './plugins/prisma'
import authPlugin from './plugins/auth'

import healthcheck from './routes/healthcheck'
import auth from './routes/auth'
import posts from './routes/posts'
import admin from './routes/admin'

export type AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify.register(sensibleDecoratorsPlugin)
  fastify.register(prismaPlugin)
  fastify.register(authPlugin)

  fastify.register(healthcheck, {prefix: '/_app'})
  fastify.register(auth, {prefix: '/auth'})
  fastify.register(posts, {prefix: '/posts'})
  fastify.register(admin, {prefix: '/admin'})
}

export default app
