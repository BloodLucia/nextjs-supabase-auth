import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { Toast } from '@/components/ui/toast/toast'
import { NextUIProvider } from '@nextui-org/system'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs Supabase Auth',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
        <Suspense>
            <Toast position="top-right" richColors duration={2500} />
          </Suspense>
      </body>
    </html>
  )
}
