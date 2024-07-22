'use client'

import { signOut } from '@/app/auth/actions'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'
import { Button } from '@nextui-org/button'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export const SignOut = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signOut, router)
    setIsLoading(false)
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
