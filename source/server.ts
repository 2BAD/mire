import fastify from 'fastify'
import routes from './routes/index.ts'

const PORT = 3000

const server = fastify()

void server.register(routes)

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
