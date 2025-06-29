import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ai from "@/public/Ai.png"
import { Button } from '@/components/ui/button'
import { getCurrentUser, isAuthenticated } from '@/lib/actions/auth.action'
import { signOut } from '@/lib/actions/auth.action'
async function RootLayout({children}:{children:React.ReactNode}) {

  const isUserAuthenticated = await isAuthenticated();

  const user = await getCurrentUser();

  const name = user?.name || "Guest";

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
      <nav className='flex items-center justify-between p-4 bg-gray-800 text-white'>
        <Link href="/">
          <Image src={ai} alt="AI Logo" width={50} height={50} className='rounded-full' />
        </Link>
        {
          !isUserAuthenticated ? (
            <div className='flex space-x-4'>
          <Link href="/sign-in">
          <Button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Sign Up
          </Button>
        </Link>
        </div>
          ): (
            <div className='flex items-center space-x-4'>
              <h2>
                Welcome, {name || "Guest"}!
              </h2>
              <Button onClick={signOut} className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                Sign Out
              </Button>
            </div>
          )
        }
      </nav>
      {children}
    </div>
  )
}

export default RootLayout