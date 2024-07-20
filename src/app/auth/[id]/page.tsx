import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDefaultAuthView, getViewTyps } from '@/utils/supabase/settings'
import { PassswordSignIn } from '@/components/ui/auth-forms/password-signin'
import { SignUp } from '@/components/ui/auth-forms/signup'
import { createClient } from '@/utils/supabase/server'

export default async function SignIn({ params }: { params: { id: string } }) {
  const viewTypes = getViewTyps()
  let viewProp: string

  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredAuthView = cookies().get('preferredAuthView')?.value || null
    viewProp = getDefaultAuthView(preferredAuthView)
    return redirect(`/auth/${viewProp}`)
  }

  const supabase = createClient()
  const { data: user, error } = await supabase.auth.getUser()

  if (user && !error) {
    return redirect('/')
  }

  return (
    <div className="w-full h-full min-h-dvh bg-stone-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-sm rounded-md p-8">
        {/* <div className="flex justify-center items-center cursor-pointer mb-6"></div> */}
        {viewProp === 'password_signin' ? <PassswordSignIn /> : <SignUp />}
      </div>
    </div>
  )
}
