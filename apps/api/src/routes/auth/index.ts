import {FastifyPluginAsync} from 'fastify'
import login from './login'
import signup from './signup'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(login)
  fastify.register(signup)
}

export default routes
