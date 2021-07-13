import { Context, useContext } from 'react'
import { InjectionContext } from './interfaces'

export function useInjected<
  I,
  T extends keyof InjectionContext<I>['instances']
>(context: Context<InjectionContext<I>>, name: T): I[T] {
  const { getInstance } = useContext(context)
  return getInstance(name as string)
}
