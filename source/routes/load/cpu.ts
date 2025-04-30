import type { FastifyPluginAsync } from 'fastify'
import { computeFibonacci, simulateCPULoad } from '~/simulate/load.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const cpuRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: { n: string } }>('/cpu/compute', async (request) => {
    return computeFibonacci(Number.parseInt(request.query.n, 10) || 40)
  })

  fastify.get<{ Querystring: { duration: string; maxLoad: string } }>('/cpu/load', async (request) => {
    const duration = Number.parseInt(request.query.duration, 10) || 10000
    const maxLoad = Number.parseInt(request.query.maxLoad, 10) || 100
    return await simulateCPULoad(duration, maxLoad)
  })
}
