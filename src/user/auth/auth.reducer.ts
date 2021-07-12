import { AuthAction, AuthActionType } from './auth.actions'

export interface AuthStore {
  authenticated: boolean
  authenticating: boolean
  name?: string
  username?: string
  roles?: string[]
}

export const storeName = 'auth'

export const initialState: AuthStore = {
  authenticated: false,
  authenticating: false,
}

export function isAuthenticatedSelector(state: AuthStore = initialState) {
  return state.authenticated
}

export function getNameSelector(state: AuthStore = initialState) {
  return state.name
}

export function authReducer(
  state: AuthStore = initialState,
  action: AuthAction
): AuthStore {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return { ...state, authenticating: true }
    case AuthActionType.LOGIN_SUCCESSFUL:
      return {
        ...state,
        authenticated: true,
        authenticating: false,
        name: action.result.name,
        username: action.result.username,
        roles: action.result.roles,
      }
    case AuthActionType.LOGOUT:
      return { authenticated: false, authenticating: false }
    default:
      return state
  }
}
