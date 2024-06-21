
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {

  const pathname = usePathname();

  return (
    <header className='w-full py-2 md:px-10 bg-white flex justify-center items-center'>
      <div className='flex items-center justify-between w-full gap-5 max-w-[900px] px-2'>
        <MobileNav />
        <div className='flex md:flex-none justify-center'>
            <Link href={'/'}>
              <Image className='h-[60px] w-[60px] bg-black rounded-full' src={'/images/uncut.png'} alt='logo' height={1000} width={1000} />
            </Link>
        </div>
        <nav className='hidden md:block'>
          <NavItems />
        </nav>

          <SignedIn>
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: '35px',
                  height: '35px',
                },
              },
            }} />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full bg-white border-2 border-black hover:bg-yellow-400' size={'icon'}>
              <Link href={`/sign-in?redirectTo=${encodeURIComponent(pathname)}`}>
                <Image src={'/icons/login.svg'} alt='sigin' width={20} height={20} />
              </Link>
            </Button>
          </SignedOut>
        </div>
    </header>
  )
}

export default Header