import Fastify from 'fastify'
import config from './config'
import app from './app'

const fastify = Fastify({
  logger: true,
})

fastify.register(app)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({port: config.port, host: '0.0.0.0'})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
