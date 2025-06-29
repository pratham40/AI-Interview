import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation';
import React from 'react'

async function AuthLayout({children}:{children:React.ReactNode}) {
  const isAuthenticat = await isAuthenticated();

  if (isAuthenticat) {
    redirect("/")
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        {children}
    </div>
  )
}

export default AuthLayout