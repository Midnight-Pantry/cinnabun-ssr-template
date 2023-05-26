import * as Cinnabun from "cinnabun"
import { GenericComponent } from "cinnabun/types"

export const Template = (App: { (): GenericComponent }) => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SSR App</title>
        <link rel="stylesheet" href="/static/index.css" />
      </head>

      <body>
        <div id="app">
          <App />
        </div>
      </body>
    </>
  )
}
