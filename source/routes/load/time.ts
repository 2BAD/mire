import type { FastifyPluginAsync } from 'fastify'
import * as sim from '~/simulate/load.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const timeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { ms: string } }>('/time/delay/:ms', async (request) => {
    return await sim.delayResponse(Number.parseInt(request.params.ms, 10))
  })
}

export default timeRoutes
