import {FastifyPluginAsync} from 'fastify'
import login from './login'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(login)
}

export default routes
