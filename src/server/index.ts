import fastify from "fastify"
import compress from "@fastify/compress"
import fStatic from "@fastify/static"
import path from "path"
import { fileURLToPath } from "url"

import { SSR } from "cinnabun/ssr"
import { Cinnabun } from "cinnabun"
import { log } from "../../.cb/logger.js"

import { App } from "../app/App.jsx"
import { Document } from "../app/Document.jsx"

const isDev = process.env.NODE_ENV === "development"

if (isDev) {
  try {
    log("Dim", "  evaluating application... 🔍")
    await SSR.serverBake(Document(App), {
      cinnabunInstance: new Cinnabun(),
      stream: null,
    })
    log("Dim", "  good to go! ✅")
  } catch (error) {
    if ("message" in (error as Error)) {
      const err = error as Error
      log(
        "FgRed",
        `
Failed to evaluate application.
${err.stack}
`
      )
      process.exit(96)
    }
  }
}

const port: number = parseInt(process.env.PORT ?? "3000")

const app = fastify()

app.register(compress, { global: false })
app.register(fStatic, {
  prefix: "/static/",
  root: path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../dist/static"
  ),
})
app.get("/favicon.ico", (_, res) => {
  res.status(404).send()
})

if (isDev)
  await import("../../.cb/sse").then(({ configureSSE }) => configureSSE(app))

app.get("/*", async (req, res) => {
  const cinnabunInstance = new Cinnabun()
  cinnabunInstance.setServerRequestData({
    path: req.url,
    data: {},
  })

  res.headers({
    "Content-Type": "text/html",
    "Transfer-Encoding": "chunked",
  })

  res.raw.write("<!DOCTYPE html><html>")

  await SSR.serverBake(Document(App), {
    cinnabunInstance,
    stream: res.raw,
  })

  res.raw.end(`</html>`)
})

app.listen({ port }, function (err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  log(
    "FgGreen",
    `
Server is listening on port ${port} - http://localhost:3000`
  )
})
