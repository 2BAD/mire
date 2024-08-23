import type { FastifyPluginAsync } from 'fastify'
import * as sim from '~/simulate/load.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const timeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: { ms: string } }>('/time/delay', async (request) => {
    return await sim.delayResponse(Number.parseInt(request.query.ms, 10) || 0)
  })
}

export default timeRoutes
