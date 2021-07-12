import { Context, useCallback, useContext, useMemo } from "react"
import { ActionCreator, CreatedActionDispatcher, FluxContextState } from "./interfaces"

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