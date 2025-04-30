import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { cpuRoutes } from './load/cpu.ts'
import { ioRoutes } from './load/io.ts'
import { memoryRoutes } from './load/mem.ts'
import { pingRoutes } from './load/ping.ts'
import { timeRoutes } from './load/time.ts'
import { limitedConnectionsPool } from './problems/connectionsPool.ts'
import { slowImage } from './problems/slowImage.ts'
import { imageGalleryRoute } from './problems/slowImageGallery.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
export const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(cpuRoutes)
  await fastify.register(ioRoutes)
  await fastify.register(memoryRoutes)
  await fastify.register(pingRoutes)
  await fastify.register(timeRoutes)
  await fastify.register(limitedConnectionsPool)
  await fastify.register(slowImage)
  await fastify.register(imageGalleryRoute)
}
