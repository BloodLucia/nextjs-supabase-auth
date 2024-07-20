'use server'

import { getToastRedirect } from '@/utils/helpers'
import { createClient } from '@/utils/supabase/server'
import { validate } from 'email-validator'
import { cookies } from 'next/headers'

export const signInWithPassword = async (formData: FormData) => {
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  const pathname = String(formData.get('pathname')).trim()
  const supabase = createClient()
  const cookieStore = cookies()

  console.log(email, password)

  let redirectUrl: string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirectUrl = getToastRedirect(pathname, 'error', error.message)
  } else if (data.user) {
    cookieStore.set('preferredAuthView', 'password_signin', { path: '/' })
    redirectUrl = getToastRedirect('/', 'success', 'You are now signed in.')
  } else {
    redirectUrl = getToastRedirect(pathname, 'error', 'Internal Error')
  }

  return redirectUrl
}

export const signUp = async (formData: FormData) => {
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  const pathname = String(formData.get('pathname')).trim()
  const supabase = createClient()
  const callbacklURL = '/api/auth/callback'
  let redirectPath: string

  if (!validate(email)) {
    redirectPath = getToastRedirect(pathname, 'error', 'Invalid Email Address.')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbacklURL,
    },
  })

  if (error) {
    redirectPath = getToastRedirect(pathname, 'error', error.message)
  } else if (data.session) {
    redirectPath = getToastRedirect('/', 'success', 'You are now signed in.')
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getToastRedirect(
      pathname,
      'error',
      'There is already an account associated with this email address. Try resetting your password.'
    )
  } else if (data.user) {
    redirectPath = getToastRedirect(
      '/dashboard',
      'success',
      'Please check your email for a confirmation link. You may now close this tab.'
    )
  } else {
    redirectPath = getToastRedirect(
      pathname,
      'error',
      'You could not be signed up.'
    )
  }

  return redirectPath
}
