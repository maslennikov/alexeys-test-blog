import fp from 'fastify-plugin'
import fastifyAuth from '@fastify/auth'
import fastifyJwt from '@fastify/jwt'
import config from '../config'

export interface VerifyDpaceKeyOptions {
  keysAllowed: string[]
}

export default fp(async (fastify, opts) => {
  fastify.register(fastifyAuth)
  fastify.register(fastifyJwt, {
    secret: config.jwtSecret,
    formatUser: (payload) => payload.user,
    trusted: async (req, decoded) => {
      // Example: invalidate tokens older than 30 days
      const TIMEOUT_SECONDS = 60 * 60 * 24 * 30
      return Date.now() / 1000 - decoded.iat < TIMEOUT_SECONDS
    },
  })
})

type JwtUser = {
  id: number
  blog: {id: number} | null
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    // payload type is used for signing and verifying
    payload: {user: JwtUser}
    // user type is return type of `request.user` object
    user: JwtUser
  }
}
