import { createContext } from 'react'
import { InjectionContext } from './interfaces'

export function createInjectionContext<Modules>() {
  return createContext<InjectionContext<Modules>>({
    instances: {} as any,
    getInstance() {
      throw new Error('Injection context not provided')
    },
  })
}
