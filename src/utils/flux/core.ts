import React, {
  Context,
  Dispatch,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

export interface ActionCreator<Action> {
  (...args: any): Action
}

export interface CreatedActionDispatcher<
  Action,
  Creator extends ActionCreator<Action>
> {
  (...args: Parameters<Creator>): void
}

export interface FluxContextState<State, Action> {
  name: string
  store: State
  dispatch: Dispatch<Action>
}

export type Effect<Action> = Promise<Action | Action[] | void>

export interface EffectReducer<State, Action> {
  (store: State, action: Action): Effect<Action>
}

export interface StoreMap {
  reducer: Reducer<any, any>
  effects?: EffectReducer<any, any>
}

export interface Store {
  store: {
    [name: string]: any
  }
  contexts: {
    [name: string]: StoreMap
  }
  dispatch: Dispatch<any>
  addContext<State, Action>(
    name: string,
    reducer: Reducer<State, Action>,
    initialState: State,
    effects?: EffectReducer<State, Action>
  ): void
}

export const StoreContext = React.createContext<Store>({
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

export function createFluxContext<State, Action>(store: State, name: string) {
  return React.createContext<FluxContextState<State, Action>>({
    name,
    store,
    dispatch() {
      throw new Error(
        `Flux dispatcher not provided for context for context "${name}"`
      )
    },
  })
}

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

function useActionCreator<State, Action, Creator extends ActionCreator<Action>>(
  context: Context<FluxContextState<State, Action>>,
  actionCreator: Creator
) {
  const { dispatch } = useContext(context)
  return useCallback<CreatedActionDispatcher<Action, Creator>>(
    (...args) => dispatch(actionCreator(...args)),
    [dispatch, actionCreator]
  )
}

function useStoreSelector<State, R, Action>(
  context: Context<FluxContextState<State, Action>>,
  selector: (store: State) => R
) {
  const { store } = useContext(context)
  return useMemo(() => selector(store), [selector, store])
}

export function makeStoreContext<State, Action>(
  context: Context<FluxContextState<State, Action>>
) {
  return {
    useStoreSelector: <R>(selector: (store: State) => R) =>
      useStoreSelector(context, selector),
    useActionCreator: <Creator extends ActionCreator<Action>>(
      actionCreator: Creator
    ) => useActionCreator(context, actionCreator),
  }
}
