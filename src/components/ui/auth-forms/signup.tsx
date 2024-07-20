'use client'

import { useState } from 'react'
import { signUp } from '@/app/auth/actions'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { usePathname, useRouter } from 'next/navigation'

export const SignUp = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const redirectUrl = await signUp(formData)
    setIsLoading(false)
    if (redirectUrl) return router.replace(redirectUrl)
  }
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch gap-y-3 w-full"
    >
      <Input
        defaultValue="thecvcoder@foxmail.com"
        size="sm"
        type="email"
        label="Email"
        required
      />
      <Input
        defaultValue="12345678"
        size="sm"
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
        SIGN UP
      </Button>
    </form>
  )
}
