import {FastifyPluginAsync} from 'fastify'
import list from './list'
import get from './get'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(list)
  fastify.register(get)
}

export default routes
