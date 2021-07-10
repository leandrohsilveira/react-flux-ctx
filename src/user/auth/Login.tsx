import { FormEvent, useCallback } from "react"
import { useActionCreator, useStoreSelector } from "../../utils";
import { AuthActionCreators } from "./auth.actions";
import { isAuthenticatedSelector } from "./auth.reducer";
import { AuthContext } from "./AuthContext";

export function Login() {

  const isAuthenticated = useStoreSelector(AuthContext, isAuthenticatedSelector)

  const login = useActionCreator(AuthContext, AuthActionCreators.login)

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, password }: HTMLFormElement = e.currentTarget
    login(username.value, password.value)
  }, [login])

  if (!isAuthenticated) {
    return (
      <form onSubmit={handleSubmit}>
        <input 
          id="username"
          type="text"
          name="username"
          placeholder="Username" 
        />
        <input 
          id="passowrd"
          type="password"
          name="password"
          placeholder="Password" 
        />
        <button type="submit">Login</button>
      </form>
    )
  }
  return null
}