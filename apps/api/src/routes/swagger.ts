import {FastifyPluginAsync} from 'fastify'
const fp = require('fastify-plugin')
import swaggerPlugin from '@fastify/swagger'
import {version} from '../../package.json'

const swagger: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(swaggerPlugin, {
    routePrefix: '/documentation',
    openapi: {
      info: {
        title: 'Welbex Test Blog',
        description:
          'API schema covers reader and publisher sections, as well as auth',
        version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      tags: [
        {name: 'auth', description: 'Auth-related endpoints'},
        {name: 'reader', description: 'Reader related endpoints'},
        {
          name: 'publisher',
          description: 'Publisher related endpoints. `Authorization required`',
        },
      ],
    },
    exposeRoute: true,
  })
})

export default swagger
