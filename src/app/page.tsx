'use client'

import { SignOut } from '@/components/ui/auth-forms/signout'

export default function Home() {
  return (
    <div className='w-full h-full min-h-dvh bg-stone-100 flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl mb-6'>Your are logged in {'🎉'}</h1>
      <SignOut />
    </div>
  )
}
