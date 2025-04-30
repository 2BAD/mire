import type { FastifyPluginAsync } from 'fastify'
import { performance } from 'node:perf_hooks'
import { slowImageGeneration } from '~/simulate/load.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const slowImage: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Querystring: { complexity: string; name: string } }>('/problems/slow-image', async (request, reply) => {
    const complexity = Number.parseInt(request.query.complexity || '1', 10)
    const name = request.query.name || 'default'

    const startTime = performance.now()
    const imageBuffer = await slowImageGeneration(complexity, name)
    const endTime = performance.now()

    const processingTime = endTime - startTime

    await reply
      .header('Content-Type', 'image/jpeg')
      .header('X-Processing-Time', processingTime.toFixed(2))
      .header('X-Timestamp', new Date().toISOString())
      .send(imageBuffer)
  })
}
