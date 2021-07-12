import { AuthResult } from './auth.model'

export enum AuthActionType {
  LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT,
}

export type AuthAction =
  | {
      type: AuthActionType.LOGIN
      username: string
      password: string
    }
  | {
      type: AuthActionType.LOGOUT
    }
  | {
      type: AuthActionType.LOGIN_SUCCESSFUL
      result: AuthResult
    }
  | {
      type: AuthActionType.LOGIN_FAILED
      message: string
    }

export const AuthActionCreators = {
  login(username: string, password: string): AuthAction {
    return {
      type: AuthActionType.LOGIN,
      username,
      password,
    }
  },

  loginSuccessful(result: AuthResult): AuthAction {
    return {
      type: AuthActionType.LOGIN_SUCCESSFUL,
      result,
    }
  },

  loginFailed(message: string): AuthAction {
    return {
      type: AuthActionType.LOGIN_FAILED,
      message,
    }
  },

  logout(): AuthAction {
    return {
      type: AuthActionType.LOGOUT,
    }
  },
}
