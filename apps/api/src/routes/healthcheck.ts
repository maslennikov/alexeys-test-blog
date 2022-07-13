import {FastifyPluginAsync} from 'fastify'
import S from 'fluent-json-schema'
import {version} from '../../package.json'

const status: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/status',
    handler: onStatus,
    schema: {
      response: {
        200: S.object() //
          .prop('status', S.string())
          .prop('version', S.string()),
      },
    },
  })

  async function onStatus(req, reply) {
    return {status: 'ok', version}
  }
}

export default status
