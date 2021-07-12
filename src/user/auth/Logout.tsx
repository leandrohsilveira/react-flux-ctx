import { useCallback } from "react";
import { AuthActionCreators } from "./auth.actions";
import { isAuthenticatedSelector } from "./auth.reducer";
import { useActionCreator, useStoreSelector } from "./AuthContext";

export function Logout() {
  const isAuthenticated = useStoreSelector(isAuthenticatedSelector)
  const logout = useActionCreator(AuthActionCreators.logout)
  const handleLogoutClick = useCallback(() => logout(), [logout])
  if (isAuthenticated) return <button type="button" onClick={handleLogoutClick}>Logout</button>
  return null
}