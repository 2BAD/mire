import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import cpu from './cpu.ts'
import io from './io.ts'
import mem from './mem.ts'
import ping from './ping.ts'

// eslint-disable-next-line jsdoc/require-jsdoc
const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  void fastify.register(ping)
  void fastify.register(cpu)
  void fastify.register(mem)
  void fastify.register(io)
}

export default routes
