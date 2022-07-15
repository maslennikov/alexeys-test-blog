import {FastifyPluginAsync} from 'fastify'
import posts from './posts'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(posts, {prefix: '/posts'})
}

export default routes
