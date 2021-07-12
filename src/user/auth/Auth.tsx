import { AuthActionCreators } from "./auth.actions";
import { isAuthenticatedSelector } from "./auth.reducer";
import { useActionCreator, useStoreSelector } from "./AuthContext";
import { Login } from "./Login";
import { Logout } from "./Logout";

export function Auth() {

  const isAuthenticated = useStoreSelector(isAuthenticatedSelector)
  const handleLogin = useActionCreator(AuthActionCreators.login)
  const handleLogout = useActionCreator(AuthActionCreators.logout)
  
  return (
    <>
      <Login 
        isAuthenticated={isAuthenticated} 
        onLogin={handleLogin} 
      />
      <Logout 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
      />
    </>
  )

}