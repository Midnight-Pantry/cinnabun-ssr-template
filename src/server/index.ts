import fastify from "fastify"
import compress from "@fastify/compress"
import fStatic from "@fastify/static"
import path from "path"

import { SSR, SSRConfig } from "cinnabun/ssr"
import { Cinnabun } from "cinnabun"
import { log } from "../../.cb/logger.js"

import { App } from "../App"
import { Template } from "../Template"

const env = process.env.NODE_ENV ?? "development"

if (env === "development") {
  ;(async () => {
    try {
      log("Dim", "  evaluating application... 🔍")
      const cinnabunInstance = new Cinnabun()
      await SSR.serverBake(Template(App), { cinnabunInstance })
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
  })()
}

const port: number = parseInt(process.env.PORT ?? "3000")
const app = fastify()

//fastify config
{
  app.register(compress, { global: false })
  app.register(fStatic, {
    prefix: "/static/",
    root: path.join(__dirname, "../../dist/static"),
  })
  app.get("/favicon.ico", (_, res) => {
    res.status(404).send()
  })
}

if (env === "development") {
  import("../../.cb/sse").then(({ configureSSE }) => configureSSE(app))
}

app.get("/*", async (req, res) => {
  const cinnabunInstance = new Cinnabun()
  cinnabunInstance.setServerRequestData({
    path: req.url,
    data: {},
  })

  const config: SSRConfig = {
    cinnabunInstance,
    stream: res.raw,
  }

  res.header("Content-Type", "text/html").status(200)
  res.header("Transfer-Encoding", "chunked")
  res.raw.write("<!DOCTYPE html><html>")

  const { componentTree } = await SSR.serverBake(Template(App), config)

  if (config.stream) {
    res.raw.write(`
      <script id="server-props">
        window.__cbData = {
          root: document.documentElement,
          component: ${JSON.stringify(componentTree)}
        }
      </script>
      <script src="/static/index.js"></script>
    `)
    res.raw.write("</html>")
    res.raw.end()
    return
  }
})

app.listen({ port }, function (err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`Server is listening on port ${port}`)
  console.log("http://localhost:3000")
})
