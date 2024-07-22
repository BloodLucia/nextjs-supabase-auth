'use client'

import { useState } from 'react'
import { signUp } from '@/app/auth/actions'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { usePathname, useRouter } from 'next/navigation'
import { handleRequest } from '@/utils/supabase/auth-helpers/client'

export const SignUp = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    await handleRequest(e, signUp, router)
    setIsLoading(false)
  }
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch gap-y-3 w-full"
    >
      <Input name="email" type="email" label="Email" required />
      <Input name="password" type="password" label="Password" required />
      <Input defaultValue={usePathname()} type="hidden" name="pathname" />
      <Button
        className="mt-3"
        isLoading={isLoading}
        type="submit"
        color="primary"
      >
        SIGN UP
      </Button>
    </form>
  )
}
