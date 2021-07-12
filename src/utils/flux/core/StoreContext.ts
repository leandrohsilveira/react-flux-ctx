import { createContext } from "react"
import { Store } from "./interfaces"

export const StoreContext = createContext<Store>({
  store: {},
  contexts: {},
  dispatch() {
    throw new Error(
      'Flux dispatcher not provided for context for central store'
    )
  },
  addContext() {
    throw new Error('Central store not provided')
  },
})