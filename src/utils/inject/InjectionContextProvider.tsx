import { Context, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { InjectionContext } from "./core";

export type InjectionContextProviderProps = PropsWithChildren<{
  context: Context<InjectionContext<any>>
  factories: { [name: string]: () => any }
}>

export function InjectionContextProvider({ context: { Provider }, factories, children }: InjectionContextProviderProps) {
  const [instances, setInstances] = useState<{ [name: string]: any }>({})
  const [_factories] = useState(factories)
  const getInstance = useCallback((name: string) => {
    if (instances[name]) {
      return instances[name]
    }
    if (_factories[name]) {
      const instance = _factories[name]()
      setInstances({ ...instances, [name]: instance })
      return instance
    }
  }, [instances, _factories, setInstances])
  const value = useMemo(() => ({ instances, getInstance }), [instances, getInstance])
  return <Provider value={value}>{children}</Provider>
}