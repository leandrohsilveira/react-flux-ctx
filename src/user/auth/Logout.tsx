interface LogoutProps {
  isAuthenticated: boolean
  onLogout(): void
}

export function Logout({ isAuthenticated, onLogout }: LogoutProps) {
  if (isAuthenticated) return <button type="button" onClick={onLogout}>Logout</button>
  return null
}