import { useCallback } from "react";
import { useActionCreator, useStoreSelector } from "../../utils";
import { AuthActionCreators } from "./auth.actions";
import { isAuthenticatedSelector } from "./auth.reducer";
import { AuthContext } from "./AuthContext";

export function Logout() {
  const isAuthenticated = useStoreSelector(AuthContext, isAuthenticatedSelector)
  const logout = useActionCreator(AuthContext, AuthActionCreators.logout)
  const handleLogoutClick = useCallback(() => logout(), [logout])
  if (isAuthenticated) return <button type="button" onClick={handleLogoutClick}>Logout</button>
  return null
}