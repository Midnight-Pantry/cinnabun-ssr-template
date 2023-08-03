import * as Cinnabun from "cinnabun"
import { createSignal } from "cinnabun"

export const Counter = () => {
  const count = createSignal(0)
  return (
    <>
      <h2>{count}</h2>
      <button onclick={() => count.value++}>Click me!</button>
    </>
  )
}
