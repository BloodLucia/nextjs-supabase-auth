export const getViewTyps = () => ['password_signin', 'signup']

export const getDefaultAuthView = (preferredAuthView: string | null) => {
  let defaultView: string = 'password_signin'
  if (preferredAuthView && getViewTyps().includes(preferredAuthView)) {
    defaultView = preferredAuthView
  }

  return defaultView
}
