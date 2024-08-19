import fastify from 'fastify'
import * as sim from './simulate/load.ts'

const PORT = 3000

const server = fastify()

server.get('/ping', async () => {
  return 'pong\n'
})

server.get<{ Params: { ms: string } }>('/delay/:ms', async (request) => {
  return await sim.delayResponse(Number.parseInt(request.params.ms, 10))
})

server.get<{ Params: { n: string } }>('/cpu/compute/:n', async (request) => {
  return sim.computeFibonacci(Number.parseInt(request.params.n, 10) || 40)
})

server.get<{ Querystring: { duration: string; maxLoad: string } }>('/cpu/load', async (request) => {
  const duration = Number.parseInt(request.query.duration, 10) || 10000
  const maxLoad = Number.parseInt(request.query.maxLoad, 10) || 100
  return await sim.simulateCPULoad(duration, maxLoad)
})

server.get('/memory', async () => {
  return sim.getMemoryUsage()
})

server.get<{ Querystring: { size: string; count: string } }>('/memory/leak', async (request) => {
  return sim.createMemoryLeak(request.query.size || '1MB', Number.parseInt(request.query.count, 10) || 1)
})

server.get<{ Querystring: { size: string } }>('/memory/allocate', async (request) => {
  return sim.allocateMemory(request.query.size || '1MB')
})

server.get<{ Querystring: { size: string } }>('/io/read', async (request) => {
  return await sim.simulateFileRead(request.query.size || '1MB')
})

server.get<{ Querystring: { size: string } }>('/io/write', async (request) => {
  return await sim.simulateFileWrite(request.query.size || '1MB')
})

server.get<{ Querystring: { url: string } }>('/io/network', async (request) => {
  return await sim.simulateNetworkRequest(request.query.url || 'https://test.k6.io')
})

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
