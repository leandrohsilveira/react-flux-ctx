import { AuthResult } from "./auth.model";

export enum AuthActionType {
  LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT,
}

export interface LoginSuccessful {
  type: AuthActionType.LOGIN_SUCCESSFUL
  result: AuthResult
}

export interface LoginFailed {
  type: AuthActionType.LOGIN_FAILED
  message: string
}

export interface LoginAction {
  type: AuthActionType.LOGIN
  username: string
  password: string
}

export interface LogoutAction {
  type: AuthActionType.LOGOUT
}

export type AuthActions = LoginAction | LogoutAction | LoginSuccessful | LoginFailed;

export const AuthActionCreators = {

  login(username: string, password: string): AuthActions {
    return {
      type: AuthActionType.LOGIN,
      username,
      password,
    }
  },

  loginSuccessful(result: AuthResult): AuthActions {
    return {
      type: AuthActionType.LOGIN_SUCCESSFUL,
      result,
    }
  },

  loginFailed(message: string): AuthActions {
    return {
      type: AuthActionType.LOGIN_FAILED,
      message,
    }
  },
  
  logout(): AuthActions {
    return {
      type: AuthActionType.LOGOUT,
    }
  }

}
