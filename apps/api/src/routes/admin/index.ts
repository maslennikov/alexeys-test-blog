import {FastifyPluginAsync} from 'fastify'
import blog from './blog'

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook(
    'onRequest',
    // validate user is logged in
    fastify.auth([async (req) => req.jwtVerify()])
  )

  fastify.register(
    async (fastify) => {
      fastify.addHook(
        'onRequest',
        // validate user has access to this blog
        fastify.auth([
          async (req) => {
            const {blogId} = req.params as any
            if (Number(blogId) != req.user.blog?.id) {
              throw new Error('Unauthorized')
            }
          },
        ])
      )

      fastify.register(blog)
    },
    {prefix: '/blog/:blogId'}
  )
}

export default routes
