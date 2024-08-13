import fastify from 'fastify';

const PORT = 3000
const MAX_DELAY = 5000

const server = fastify()

// Route 0: Check if server is running
server.get('/ping', async () => {
  return 'pong\n'
})

// Route 1: Delayed response
server.get<{Params:{ms: string}}>('/delay/:ms', async (request) => {
  const ms = parseInt(request.params.ms, 10) || Math.trunc(Math.random() * MAX_DELAY)
  await new Promise(resolve => setTimeout(resolve, ms))
  return `Response delayed by ${ms} ms\n`
})

// Route 2: CPU-intensive work
server.get<{Params:{n: string}}>('/compute/:n', async (request) => {
  const n = parseInt(request.params.n, 10) || 40

  // eslint-disable-next-line jsdoc/require-jsdoc
  const fibonacci = (num: number): number => {
    if (num <= 1) return num
    return fibonacci(num - 1) + fibonacci(num - 2)
  }

  const result = fibonacci(n)
  return `Fibonacci(${n}) = ${result}\n`
})

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
