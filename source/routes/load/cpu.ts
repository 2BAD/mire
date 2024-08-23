import type { FastifyPluginAsync } from 'fastify'
import * as sim from '~/simulate/load.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const cpuRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { n: string } }>('/cpu/compute/:n', async (request) => {
    return sim.computeFibonacci(Number.parseInt(request.params.n, 10) || 40)
  })

  fastify.get<{ Querystring: { duration: string; maxLoad: string } }>('/cpu/load', async (request) => {
    const duration = Number.parseInt(request.query.duration, 10) || 10000
    const maxLoad = Number.parseInt(request.query.maxLoad, 10) || 100
    return await sim.simulateCPULoad(duration, maxLoad)
  })
}

export default cpuRoutes
