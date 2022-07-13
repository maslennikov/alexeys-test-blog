import {FastifyPluginAsync} from 'fastify'
import sensibleDecoratorsPlugin from './plugins/sensible'
import healthcheck from './routes/healthcheck'

export type AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify.register(sensibleDecoratorsPlugin)

  fastify.register(healthcheck, {prefix: '/_app'})
}

export default app
