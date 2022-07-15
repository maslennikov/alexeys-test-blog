import {FastifyPluginAsync} from 'fastify'
import list from './posts/list'
import create from './posts/create'
import remove from './posts/delete'
import publish from './posts/publish'
// import get from './get'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(
    async (fastify) => {
      fastify.register(list)
      fastify.register(create)
      fastify.register(publish)
      fastify.register(remove)
      // fastify.register(get)
    },
    {prefix: '/posts'}
  )
}

export default routes
