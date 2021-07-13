import { AuthActionCreators, AuthAction, AuthActionType } from './auth.actions'
import { AuthStore } from './auth.reducer'
import { AuthService } from './auth.service'

export interface AuthEffects {
  effects(state: AuthStore, action: AuthAction): Promise<AuthAction | void>
}

export class AuthEffectsImpl implements AuthEffects {

  constructor(private authService: AuthService) {
    this.effects = this.effects.bind(this)
  }

  async effects(state: AuthStore, action: AuthAction) {
    switch (action.type) {
      case AuthActionType.LOGIN:
        return this.loginEffect(action.username, action.password)
      default:
        break
    }
  }
  
  private async loginEffect(username: string, password: string) {
    try {
      const result = await this.authService.login(username, password)
      return AuthActionCreators.loginSuccessful(result)
    } catch (error) {
      return AuthActionCreators.loginFailed(error.message)
    }
  }


}

