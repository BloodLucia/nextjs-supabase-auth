import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDefaultAuthView, getViewTyps } from '@/utils/supabase/settings'
import { PassswordSignIn } from '@/components/ui/auth-forms/password-signin'
import { SignUp } from '@/components/ui/auth-forms/signup'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { Link } from '@nextui-org/link'

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
        <Image
          width={180}
          height={0}
          src="/supabase.svg"
          alt=""
          className="mx-auto mb-6 w-[180px] h-auto cursor-pointer"
        />
        {viewProp === 'password_signin' ? <PassswordSignIn /> : <SignUp />}
        <div className="text-center text-sm mt-4">
          {viewProp === 'password_signin' ? (
            <>
              Don{"'"}t have an account?{' '}
              <Link className="text-sm" href="/auth/signup">
                Sign up now.
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link className="text-sm" href="/auth/password_signin">
                Sign in now.
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
