import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import cpu from './load/cpu.ts'
import io from './load/io.ts'
import mem from './load/mem.ts'
import ping from './load/ping.ts'
import time from './load/time.ts'
import limitedConnectionsPool from './problems/connectionsPool.ts'
import slowImage from './problems/slowImage.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  void fastify.register(cpu)
  void fastify.register(io)
  void fastify.register(mem)
  void fastify.register(ping)
  void fastify.register(time)
  void fastify.register(limitedConnectionsPool)
  void fastify.register(slowImage)
}

export default routes
