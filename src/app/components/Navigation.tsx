import * as Cinnabun from "cinnabun"
import { Link } from "cinnabun/router"
import { pathStore } from "../state/state"

export const Navigation = () => {
  return (
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
}
