import { FormEvent, useCallback } from "react"

interface LoginProps {
  isAuthenticated: boolean
  onLogin(username: string, password: string): void
}

export function Login({ isAuthenticated, onLogin }: LoginProps) {

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const { username, password }: HTMLFormElement = e.currentTarget
      onLogin(username.value, password.value)
    },
    [onLogin]
  )

  if (!isAuthenticated) {
    return (
      <form onSubmit={handleSubmit}>
        <input 
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username" 
        />
        <input 
          id="passowrd"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    )
  }
  return null
}