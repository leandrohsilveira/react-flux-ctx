import React, { Context, Dispatch, Reducer, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

export interface ActionCreator<Action> {
  (...args: any): Action
}

export interface CreatedActionDispatcher<Action, Creator extends ActionCreator<Action>> {
  (...args: Parameters<Creator>): void;
}

export interface FluxContext<Store, Action> {
  name: string;
  store: Store;
  dispatch: Dispatch<Action>;
}

export type Effect<Action> = (Promise<Action | void> | Action) | void

export interface EffectReducer<Store, Action> {
  (store: Store, action: Action): Effect<Action>
}

export function createFluxContext<Store, Action>(store: Store, name: string) {
  return React.createContext<FluxContext<Store, Action>>({
    name,
    store,
    dispatch: () => { throw new Error(`Flux dispatcher not provided for context "${name}"`) }
  });
}

export function useStore<Store, Action>(name: string, reducer: Reducer<Store, Action>, initialStore: Store, effectsReducer?: EffectReducer<Store, Action>) {
  const [effects, setEffects] = useState<Effect<Action>[]>([])
  const [store, dispatch] = useReducer((state: Store, action: Action) => {
    const result = reducer(state, action)
    if(effectsReducer) {
      const effect = effectsReducer(result, action)
      if (effect) 
        setEffects([...effects, effect])
    }
    return result
  }, initialStore)
  useEffect(() => {
    const effect = effects[0]
    if (effect) {
      setEffects(effects.filter(e => e !== effect))
      if (effect instanceof Promise) 
        effect.then(action => {
          if (action)
            dispatch(action)
        })
      else
        dispatch(effect)
    }
  }, [effects])
  return useMemo<FluxContext<Store, Action>>(() => ({ name, store, dispatch }), [name, store, dispatch])
}

export function useActionCreator<Store, Action, Creator extends ActionCreator<Action>>(
  context: Context<FluxContext<Store, Action>>, 
  actionCreator: Creator
) {
  const { dispatch } = useContext(context);
  return useCallback<CreatedActionDispatcher<Action, Creator>>((...args) => dispatch(actionCreator(...args)), [dispatch, actionCreator]);
}

export function useStoreSelector<Store, R, Action>(context: Context<FluxContext<Store, Action>>, selector: (store: Store) => R) {
  const { store } = useContext(context);
  return useMemo(() => selector(store), [selector, store]);
}