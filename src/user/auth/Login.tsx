import { FormEvent, useCallback } from 'react'

import './Login.css'

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
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          id='username'
          type='text'
          name='username'
          placeholder='Username'
          autoComplete='username'
          required
        />
        <input
          id='passowrd'
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='current-password'
          required
        />
        <button type='submit'>Login</button>
      </form>
    )
  }
  return null
}
