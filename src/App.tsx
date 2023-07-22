import * as Cinnabun from "cinnabun"
import { Router, Route, Link } from "cinnabun/router"
import { Logo } from "./Logo"
import { createSignal } from "cinnabun"
import { pathStore } from "./state"

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/" store={pathStore}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/counter" store={pathStore}>
          Counter
        </Link>
      </li>
    </ul>
  </nav>
)

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
