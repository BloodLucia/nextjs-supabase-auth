export const getToastRedirect = (
  path: string,
  toastType: 'success' | 'error',
  message: string
): string => {
  return `${path}?type=${toastType}&message=${encodeURIComponent(message)}`
}
