import * as Cinnabun from "cinnabun"
import { createSignal } from "cinnabun"

import { Logo } from "./Logo"

const Counter = () => {
  const count = createSignal(0)

  return (
    <>
      <h2>{count}</h2>
      <button onclick={() => count.value++}>Click me!</button>
    </>
  )
}

export const App = () => {
  return (
    <div>
      <h1>Cinnabun JS</h1>
      <br />
      <Logo />
      <br />
      <h2>Get started by editing App.tsx!</h2>
      <Counter />
      <footer>
        <span style={{ color: "#ccc" }}>Made with love and friends 💞</span>
        <a target="_new" href="https://github.com/Midnight-Pantry/cinnabun">
          Github
        </a>
        <a
          target="_new"
          href="https://github.com/Midnight-Pantry/cinnabun/tree/main/apps/components/src"
        >
          Component Examples
        </a>
      </footer>
    </div>
  )
}
