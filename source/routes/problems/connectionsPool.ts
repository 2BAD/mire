import type { FastifyPluginAsync } from 'fastify'
import { delayResponse } from '~/simulate/load.ts'

const MAX_CONCURRENT_CONNECTIONS = 5

class ConnectionsPool {
  private readonly maxConnections: number
  private currentConnections: number
  private readonly queue: Array<(value: string) => void>

  constructor(maxConnections: number) {
    this.maxConnections = maxConnections
    this.currentConnections = 0
    this.queue = []
  }

  async acquire(): Promise<void> {
    if (this.currentConnections < this.maxConnections) {
      this.currentConnections++
      await Promise.resolve()
      return
    }

    await new Promise((resolve) => {
      this.queue.push(resolve)
    })
  }

  release(): void {
    this.currentConnections--
    if (this.queue.length > 0) {
      const next = this.queue.shift()
      if (next) {
        this.currentConnections++
        next('work')
      }
    }
  }
}

const pool = new ConnectionsPool(MAX_CONCURRENT_CONNECTIONS)

// eslint-disable-next-line jsdoc/require-jsdoc
export const limitedConnectionsPool: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { ms: string } }>('/problems/limited-connections/pool/:ms', async (request) => {
    try {
      await pool.acquire()

      // Simulate some work
      return await delayResponse(Number.parseInt(request.params.ms, 10))
    } finally {
      pool.release()
    }
  })
}

export default limitedConnectionsPool
