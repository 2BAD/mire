import fastify from 'fastify';

const PORT = 3000
const MAX_DELAY = 5000

const server = fastify()

// Global variable to store memory leaks
const memoryLeaks: unknown[] = []

// Route 0: Check if server is running
server.get('/ping', async () => {
  return 'pong\n'
})

// Route 1: Delayed response
server.get<{ Params: { ms: string } }>('/delay/:ms', async (request) => {
  const ms = Number.parseInt(request.params.ms, 10) || Math.trunc(Math.random() * MAX_DELAY)
  await new Promise((resolve) => setTimeout(resolve, ms))
  return `Response delayed by ${ms} ms\n`
})

// Route 2: CPU-intensive work
server.get<{ Params: { n: string } }>('/cpu/compute/:n', async (request) => {
  const n = Number.parseInt(request.params.n, 10) || 40

  // eslint-disable-next-line jsdoc/require-jsdoc
  const fibonacci = (num: number): number => {
    if (num <= 1) return num
    return fibonacci(num - 1) + fibonacci(num - 2)
  }

  const result = fibonacci(n)
  return `Fibonacci(${n}) = ${result}\n`
})

// Route 3: Simulate random CPU usage
server.get<{ Querystring: { duration: string; maxLoad: string } }>('/cpu/load', async (request) => {
  const duration = Number.parseInt(request.query.duration, 10) || 10000 // Default to 10 seconds
  const maxLoad = Number.parseInt(request.query.maxLoad, 10) || 100 // Default to 100% max load

  const start = Date.now()
  let totalLoad = 0
  let cycles = 0

  while (Date.now() - start < duration) {
    const cycleStart = Date.now()
    const targetLoad = Math.random() * maxLoad

    // Perform CPU-intensive work
    // 100ms cycles
    while (Date.now() - cycleStart < 100) {
      for (let i = 0; i < 10000; i++) {
        Math.sqrt(i)
      }
    }

    // Sleep for the remaining time to achieve target load
    const elapsed = Date.now() - cycleStart
    const sleepTime = Math.max(0, 100 * (1 - targetLoad / 100) - (elapsed % 100))
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    await new Promise((resolve) => setTimeout(resolve, sleepTime))

    totalLoad += targetLoad
    cycles++
  }

  const averageLoad = totalLoad / cycles

  return `Random CPU load simulated for ${duration} ms. Average load: ${averageLoad.toFixed(2)}%\n`
})

// Route 4: Get current memory usage
server.get('/memory', async () => {
  const used = process.memoryUsage()
  return {
    rss: `${Math.round((used.rss / 1024 / 1024) * 100) / 100} MB`,
    heapTotal: `${Math.round((used.heapTotal / 1024 / 1024) * 100) / 100} MB`,
    heapUsed: `${Math.round((used.heapUsed / 1024 / 1024) * 100) / 100} MB`,
    external: `${Math.round((used.external / 1024 / 1024) * 100) / 100} MB`,
    arrayBuffers: `${Math.round((used.arrayBuffers / 1024 / 1024) * 100) / 100} MB`
  }
})

// Route 5: Create a memory leak
server.get<{ Querystring: { size: string; count: string } }>('/memory/leak', async (request) => {
  const size = Number.parseInt(request.query.size, 10) || 1024 * 1024 // Default to 1MB
  const count = Number.parseInt(request.query.count, 10) || 1

  for (let i = 0; i < count; i++) {
    const leak = Buffer.alloc(size)
    memoryLeaks.push(leak)
  }

  return `Created ${count} memory leak(s) of size ${size} bytes each\n`
})

// Route 6: Allocate memory
server.get<{ Querystring: { size: string } }>('/memory/allocate', async (request) => {
  const size = Number.parseInt(request.query.size, 10) || 1024 * 1024 // Default to 1MB

  const buffer = Buffer.alloc(size)

  // We need to use the buffer to prevent it from being garbage collected immediately
  buffer.write('Memory allocated', 0)

  return `Allocated ${size} bytes of memory\n`
})

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
