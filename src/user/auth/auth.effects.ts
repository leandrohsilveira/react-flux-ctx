import { AuthActionCreators, AuthActions, AuthActionType, LoginAction } from "./auth.actions";
import { AuthStore } from "./auth.reducer";
import { AuthService } from "./auth.service";

export async function authEffects(state: AuthStore, action: AuthActions) {
  switch(action.type) {
    case AuthActionType.LOGIN:
      return loginEffect(action)
    default:
      break
  }
}

async function loginEffect(action: LoginAction) {
  try {
    const result = await AuthService.login(action.username, action.password)
    return AuthActionCreators.loginSuccessful(result)
  } catch (error) {
    return AuthActionCreators.loginFailed(error.message)
  }
}