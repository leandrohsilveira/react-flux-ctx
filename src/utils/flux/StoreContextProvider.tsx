import {
  PropsWithChildren,
  Reducer,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { StoreContext, EffectReducer, StoreMap } from './core'

const SET_INITIAL_STATE_TYPE = '@flux_setInitialState'

export function StoreContextProvider({
  initialStore = {},
  children,
}: PropsWithChildren<{ initialStore?: any }>) {
  const [contexts, setContexts] = useState<{ [name: string]: StoreMap }>({})
  const addContext = useCallback(
    <State, Action>(
      name: string,
      reducer: Reducer<State, Action>,
      initialState: State,
      effects?: EffectReducer<State, Action>
    ) => {
      if (!contexts[name]) {
        setContexts({ ...contexts, [name]: { reducer, effects } })
        dispatch({ type: SET_INITIAL_STATE_TYPE, name, initialState })
      }
    },
    [contexts, setContexts]
  )
  const [store, dispatch] = useReducer((state: any = {}, action: any) => {
    const newStore = { ...state }
    Object.entries(contexts).forEach(([name, { reducer, effects }]) => {
      if (action.type === SET_INITIAL_STATE_TYPE)
        newStore[action.name] = action.initialState
      let newState = newStore[name]
      try {
        newState = reducer(newState, action)
        newStore[name] = newState
      } finally {
        if (effects)
          effects(newState, action).then((effect) => {
            if (effect) {
              if (Array.isArray(effect)) effect.forEach(dispatch)
              else dispatch(effect)
            }
          })
      }
    })
    return newStore
  }, initialStore)
  return (
    <StoreContext.Provider
      value={useMemo(
        () => ({ store, contexts, dispatch, addContext }),
        [store, contexts, dispatch, addContext]
      )}
    >
      {children}
    </StoreContext.Provider>
  )
}
