/* eslint-disable @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions */
import fastify from 'fastify'
import routes from './routes/index.ts'

const DEFAULT_PORT = 3000
const DEFAULT_HOST = '127.0.0.1'
const PORT = Number.parseInt(process.env['PORT'] || DEFAULT_PORT.toString(), 10)
const HOST = process.env['HOST'] || DEFAULT_HOST

const server = fastify()

void server.register(routes)

server.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
