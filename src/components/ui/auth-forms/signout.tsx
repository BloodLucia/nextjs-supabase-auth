'use client'

import { signOut } from '@/app/auth/actions'
import { Button } from '@nextui-org/button'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export const SignOut = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const redirectPath = await signOut(formData)
    setIsLoading(false)
    if (redirectPath) router.replace(redirectPath)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="pathname" defaultValue={usePathname()} />
      <Button isLoading={isLoading} type="submit" color="danger">
        SIGN OUT
      </Button>
    </form>
  )
}
