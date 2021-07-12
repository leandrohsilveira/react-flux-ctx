import { AuthActionCreators, AuthAction, AuthActionType } from './auth.actions'
import { AuthStore } from './auth.reducer'
import { AuthService } from './auth.service'

export async function authEffects(state: AuthStore, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return loginEffect(action.username, action.password)
    default:
      break
  }
}

async function loginEffect(username: string, password: string) {
  try {
    const result = await AuthService.login(username, password)
    return AuthActionCreators.loginSuccessful(result)
  } catch (error) {
    return AuthActionCreators.loginFailed(error.message)
  }
}
