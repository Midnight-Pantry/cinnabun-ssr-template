import * as Cinnabun from "cinnabun"
import { Logo } from "./Logo"

export const App = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <h1>Cinnabun JS</h1>
      <br />
      <Logo />
      <br />
      <h2>Get started by editing App.tsx!</h2>
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
