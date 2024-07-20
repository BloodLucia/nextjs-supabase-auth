import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDefaultAuthView } from '@/utils/supabase/settings'

export default function Auth() {
  const preferredAuthView = cookies().get('preferredAuthView')?.value || null
  const defaultView = getDefaultAuthView(preferredAuthView)

  return redirect(`/auth/${defaultView}`)
}
