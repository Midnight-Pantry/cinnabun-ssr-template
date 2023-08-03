import * as Cinnabun from "cinnabun"
import { Router, Route } from "cinnabun/router"
import { Logo } from "./components/Logo"
import { pathStore } from "./state/state"
import { Navigation } from "./components/Navigation"
import { Counter } from "./components/Counter"

export const App = () => {
  return (
    <div>
      <h1>Cinnabun JS</h1>
      <br />
      <Logo />
      <br />
      <h2>Get started by editing App.tsx!</h2>

      <Navigation />
      <Router store={pathStore}>
        <Route path="/" component={<h3>Home</h3>} />
        <Route path="/counter" component={<Counter />} />
      </Router>

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
