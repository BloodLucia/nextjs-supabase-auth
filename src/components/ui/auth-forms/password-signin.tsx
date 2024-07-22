'use client'

import { useState } from 'react'
import { signInWithPassword } from '@/app/auth/actions'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { usePathname, useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'

export const PassswordSignIn = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    setIsLoading(true)
    await handleRequest(e, signInWithPassword, router)
    // const formData = new FormData(e.currentTarget)
    // const redirectPath = await signInWithPassword(formData)
    setIsLoading(false)
    // if (redirectPath) return router.replace(redirectPath)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch gap-y-3 w-full"
    >
      <Input
        autoComplete="email"
        name="email"
        type="email"
        label="Email"
        required
      />
      <Input
        autoComplete="current-password"
        name="password"
        type="password"
        label="Password"
        required
      />
      <Input defaultValue={usePathname()} type="hidden" name="pathname" />
      <Button
        className="mt-3"
        isLoading={isLoading}
        type="submit"
        color="primary"
      >
        SIGN IN
      </Button>
    </form>
  )
}
