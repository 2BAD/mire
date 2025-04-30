import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line jsdoc/require-jsdoc
export const pingRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/ping', async () => {
    return 'pong\n'
  })
}
