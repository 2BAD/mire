import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import cpu from './load/cpu.ts'
import io from './load/io.ts'
import mem from './load/mem.ts'
import ping from './load/ping.ts'
import limitedConnectionsPool from './problems/connectionsPool.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  void fastify.register(ping)
  void fastify.register(cpu)
  void fastify.register(mem)
  void fastify.register(io)
  void fastify.register(limitedConnectionsPool)
}

export default routes
