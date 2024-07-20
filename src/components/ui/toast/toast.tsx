'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast, Toaster, ToasterProps } from 'sonner'

export const Toast: React.FC<ToasterProps> = (props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const type = searchParams.get('type') as 'success' | 'error'
    const message = searchParams.get('message')
    const clearFn = () => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      const paramsToRemove = ['type', 'message']
      paramsToRemove.forEach((param) => newSearchParams.delete(param))
      const redirectPath = `${pathname}?${newSearchParams.toString()}`
      router.replace(redirectPath, { scroll: false })
    }

    switch (type) {
      case 'success':
        toast.success(message)
        clearFn()
        break
      case 'error':
        toast.error(message)
        clearFn()
      default:
        clearFn()
        break
    }
  }, [searchParams, pathname, router])

  return <Toaster {...props} />
}
