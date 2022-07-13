import {FastifyPluginAsync} from 'fastify'
import S from 'fluent-json-schema'
import {version} from '../../package.json'

const postSchema = S.object() //
  .prop('id', S.number())
  .prop('title', S.string())
  .prop('author', S.string())
  .prop('createdAt', S.number())

const posts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: list,
    schema: {
      response: {
        200: S.object() //
          .prop('total', S.number())
          .prop('posts', S.array().items(postSchema)),
      },
    },
  })

  async function list(req, reply) {
    const posts = await fastify.prisma.post.findMany({
      // include: { author: true },
    })
    return {
      total: posts.length,
      posts,
    }
  }
}

export default posts
