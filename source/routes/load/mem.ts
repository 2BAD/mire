import type { FastifyPluginAsync } from 'fastify'
import { allocateMemory, createMemoryLeak, getMemoryUsage } from '~/simulate/load.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const memoryRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/memory', async () => {
    return getMemoryUsage()
  })

  fastify.get<{ Querystring: { size: string; count: string } }>('/memory/leak', async (request) => {
    return createMemoryLeak(request.query.size || '1MB', Number.parseInt(request.query.count, 10) || 1)
  })

  fastify.get<{ Querystring: { size: string } }>('/memory/allocate', async (request) => {
    return allocateMemory(request.query.size || '1MB')
  })
}
