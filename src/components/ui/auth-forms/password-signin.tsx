'use client'

import { useState } from 'react'
import { signInWithPassword } from '@/app/auth/actions'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { usePathname, useRouter } from 'next/navigation'

export const PassswordSignIn = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    console.log(formData.get('email'))

    const redirectUrl = await signInWithPassword(formData)
    setIsLoading(false)
    if (redirectUrl) return router.replace(redirectUrl)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch gap-y-3 w-full"
    >
      <Input
        autoComplete="email"
        size="sm"
        name="email"
        type="email"
        label="Email"
        required
      />
      <Input
        autoComplete="current-password"
        size="sm"
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
