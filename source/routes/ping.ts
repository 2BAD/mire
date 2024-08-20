import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line jsdoc/require-jsdoc
const pingRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/ping', async () => {
    return 'pong\n'
  })
}

export default pingRoutes
