import { Dispatch, Reducer } from 'react'

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
