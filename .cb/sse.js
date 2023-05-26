/**
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} reply
 */
function eventsHandler(req, reply) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  }
  reply.raw.writeHead(200, headers)
  reply.raw.write(
    `event:handshake\ndata: ${new Date().toLocaleTimeString()}\n\n`
  )
}

/** @param {import("fastify").FastifyInstance} app */
function configureSSE(app) {
  app.get("/sse", eventsHandler)
}

module.exports = {
  configureSSE,
}
