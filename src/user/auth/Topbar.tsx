import { AuthActionCreators } from './auth.actions'
import { getNameSelector, isAuthenticatedSelector } from './auth.reducer'
import { useActionCreator, useStoreSelector } from './AuthContext'
import { CurrentUser } from './CurrentUser'
import { Login } from './Login'
import { Logout } from './Logout'

import './Topbar.css'

export function Topbar() {
  const isAuthenticated = useStoreSelector(isAuthenticatedSelector)
  const name = useStoreSelector(getNameSelector)
  const handleLogin = useActionCreator(AuthActionCreators.login)
  const handleLogout = useActionCreator(AuthActionCreators.logout)

  return (
    <div className="topbar">
      <h1>App</h1>
      <div className="auth">
        <Login isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        <CurrentUser isAuthenticated={isAuthenticated} name={name} />
        <Logout isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </div>
    </div>
  )
}
