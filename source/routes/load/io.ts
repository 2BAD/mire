import type { FastifyPluginAsync } from 'fastify'
import { simulateFileRead, simulateFileWrite, simulateNetworkRequest } from '~/simulate/load.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const ioRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: { size: string } }>('/io/read', async (request) => {
    return await simulateFileRead(request.query.size || '1MB')
  })

  fastify.get<{ Querystring: { size: string } }>('/io/write', async (request) => {
    return await simulateFileWrite(request.query.size || '1MB')
  })

  fastify.get<{ Querystring: { url: string } }>('/io/network', async (request) => {
    return await simulateNetworkRequest(request.query.url || 'https://test.k6.io')
  })
}
