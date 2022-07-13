import Fastify from 'fastify'
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
    await fastify.listen({port: 5000})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
