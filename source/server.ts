import fastify from 'fastify'
import routes from './routes/index.ts'

const DEFAULT_PORT = 3000
// biome-ignore lint/complexity/useLiteralKeys: tsc > biome
const PORT = Number.parseInt(process.env['PORT'] || DEFAULT_PORT.toString(), 10) // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/strict-boolean-expressions

const server = fastify()

void server.register(routes)

server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
