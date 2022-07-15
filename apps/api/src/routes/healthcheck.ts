import {FastifyPluginAsync, FastifySchema} from 'fastify'
import S from 'fluent-json-schema'
import {version} from '../../package.json'

const schema: FastifySchema = {
  response: {
    200: S.object() //
      .prop('status', S.string())
      .prop('version', S.string()),
  },
  summary: 'Healthcheck',
  description: `
  Returns \`ok\` if server is running`,
}

const status: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', {schema}, async () => {
    return {status: 'ok', version}
  })
}

export default status
