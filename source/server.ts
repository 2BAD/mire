import Fastify from 'fastify'
import metricsPlugin from 'fastify-metrics'
import prexit from 'prexit'
import { routes } from './routes/index.ts'

const DEFAULT_PORT = 3000
const DEFAULT_HOST = '127.0.0.1'

const PORT = Number.parseInt(process.env['PORT'] || DEFAULT_PORT.toString(), 10)
const HOST = process.env['HOST'] || DEFAULT_HOST

const server = Fastify({
  logger: true
})

await server.register(routes)
await server.register(metricsPlugin.default, {
  endpoint: '/metrics',
  routeMetrics: {
    registeredRoutesOnly: false
  }
})

try {
  await server.listen({ port: PORT, host: HOST })
} catch (err) {
  server.log.error(err)
}

prexit(async () => {
  console.info('Shutting down...')
  await server.close()
})
