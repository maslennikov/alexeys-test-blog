import {FastifyPluginAsync} from 'fastify'
import list from './list'
import create from './create'
import update from './update'
import remove from './delete'
import publish from './publish'
import get from './get'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(list)
  fastify.register(create)

  // guard these endpoints with extra check
  // that user has access to the entity
  fastify.register(async (fastify) => {
    fastify.addHook('onRequest', async (req, rep) => {
      const {id, blogId} = req.params as any

      const res = await fastify.prisma.post.findUnique({
        where: {id: Number(id)},
        select: {blogId: true},
      })

      if (!res) return rep.notFound()
      if (res.blogId != blogId)
        return rep.unauthorized('Post belongs to another blog')
    })

    fastify.register(get)
    fastify.register(update)
    fastify.register(publish)
    fastify.register(remove)
  })
}

export default routes
