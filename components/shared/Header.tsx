import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { getUserbyUserId } from '@/lib/actions/user.actions'

const Header = async () => {

  return (
    <header className='w-full py-2 md:px-10 bg-white'>
      <div className='flex items-center justify-evenly'>
        <MobileNav />
        <Link href={'/'}>
          <Image className='h-[60px] w-[60px] bg-yellow-400 rounded-full border-[2px] border-black' src={'/logo.png'} alt='logo' height={1000} width={1000} />
        </Link>

        <nav className='hidden md:block'>
          <NavItems />
        </nav>

        <div className='flex justify-end gap-5'>
          <SignedIn>
            <Link href={'/my-orders'} className='flex justify-center items-center'>
              <Image src={'/icons/bell.svg'} alt='bell' height={20} width={20} />
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-md bg-white border-2 border-black hover:bg-yellow-400' size={'icon'}>
              <Link href={'/sign-in'}>
                <Image src={'/icons/login.svg'} alt='sigin' width={20} height={20} />
              </Link>
            </Button>
          </SignedOut>

        </div>
      </div>
    </header>
  )
}

export default Header