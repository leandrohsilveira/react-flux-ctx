import { createContext } from "react"
import { FluxContextState } from "./interfaces"

export function createFluxContext<State, Action>(store: State, name: string) {
  return createContext<FluxContextState<State, Action>>({
    name,
    store,
    dispatch() {
      throw new Error(
        `Flux dispatcher not provided for context for context "${name}"`
      )
    },
  })
}