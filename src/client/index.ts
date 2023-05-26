import "./index.css"
import { Hydration } from "cinnabun/hydration"
import { Template } from "../Template"
import { SSRProps } from "cinnabun/src/types"
import { App } from "../App"
const env = process.env.NODE_ENV ?? "development"

if ("__cbData" in window) {
  Hydration.hydrate(Template(App), window.__cbData as SSRProps)

  if (env === "development") {
    const evtHandler = new EventSource("/sse")
    let didConnect = false
    evtHandler.addEventListener("handshake", () => {
      didConnect = true
    })

    evtHandler.addEventListener("error", (evt: Event) => {
      const connIsReset = didConnect && evtHandler.readyState === 0
      if (connIsReset) location.reload()
      console.log("evtHandler err evt", evt)
    })
  }
}
