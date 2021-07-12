import { Reducer, useContext, useEffect, useMemo } from 'react'
import { EffectReducer, FluxContextState } from './interfaces'
import { StoreContext } from './StoreContext'

export function useStoreContext<State, Action>(
  name: string,
  reducer: Reducer<State, Action>,
  initialState: State,
  effects?: EffectReducer<State, Action>
) {
  const { store, dispatch, addContext } = useContext(StoreContext)
  const state = store[name]
  useEffect(
    () => addContext(name, reducer, initialState, effects),
    [name, initialState, reducer, effects, addContext]
  )
  return useMemo<FluxContextState<State, Action>>(
    () => ({ store: state, name, dispatch }),
    [name, state, dispatch]
  )
}
