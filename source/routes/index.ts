import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import cpu from './load/cpu.ts'
import io from './load/io.ts'
import mem from './load/mem.ts'
import ping from './load/ping.ts'
import time from './load/time.ts'
import limitedConnectionsPool from './problems/connectionsPool.ts'
import slowImage from './problems/slowImage.ts'
import slowImageGallery from './problems/slowImageGallery.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(cpu)
  await fastify.register(io)
  await fastify.register(mem)
  await fastify.register(ping)
  await fastify.register(time)
  await fastify.register(limitedConnectionsPool)
  await fastify.register(slowImage)
  await fastify.register(slowImageGallery)
}

export default routes
