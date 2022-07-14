import {FastifyPluginAsync} from 'fastify'
import list from './list'
import get from './get'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(get)
  fastify.register(list)
}

export default routes
