interface CurrentUserProps {
  isAuthenticated: boolean
  name?: string
}

export function CurrentUser({ isAuthenticated, name }: CurrentUserProps) {
  if (isAuthenticated)
    return (
      <>
        <strong>User</strong>: {name}
      </>
    )
  return null
}
