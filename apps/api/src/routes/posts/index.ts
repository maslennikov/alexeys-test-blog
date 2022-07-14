import {FastifyPluginAsync} from 'fastify'
import list from './list'
import get from './get'
import create from './create'
import publish from './publish'
import remove from './delete'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(get)
  fastify.register(list)
  fastify.register(create)
  fastify.register(publish)
  fastify.register(remove)
}

export default routes
