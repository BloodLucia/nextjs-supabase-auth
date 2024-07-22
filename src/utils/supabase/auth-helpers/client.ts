'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { redirectToPath } from './server'

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  // Prevent default form submission refresh
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const redirectUrl: string = await requestFunc(formData)

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.replace(redirectUrl)
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl)
  }
}
