
'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {

  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {

    setTimeout(() => {
      setVisible(true);
    }, 1000);

  }, [])

  return (
    <header className='w-full py-2 md:px-10 bg-white flex justify-center items-center'>
      <div className='flex items-center justify-between w-full gap-5 max-w-[900px] px-2'>
        <MobileNav />
        <div className='flex md:flex-none justify-center'>
          <a href={'/'}>
            <Image className='h-[60px] w-[60px] bg-black rounded-full' src={'/images/uncut.png'} alt='logo' height={1000} width={1000} />
          </a>
        </div>
        <nav className='hidden md:block'>
          <NavItems />
        </nav>

        <SignedIn>
          <div className='relative' style={{ width: '35px', height: '35px' }}>
            <div className={visible ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300 absolute inset-0 bg-slate-400 rounded-full'}></div>
            <div className={visible ? 'opacity-100 transition-opacity duration-300 absolute inset-0' : 'opacity-0 transition-opacity duration-300 absolute inset-0'}>
              <UserButton appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '35px',
                    height: '35px',
                  },
                },
              }} />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <Button asChild className='rounded-full bg-white border-2 border-black hover:bg-yellow-400' size={'icon'}>
            <a href={`/sign-in?redirectTo=${encodeURIComponent(pathname)}`}>
              <Image src={'/icons/login.svg'} alt='sigin' width={20} height={20} />
            </a>
          </Button>
        </SignedOut>
      </div>
    </header>
  )
}

export default Header