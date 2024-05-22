import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import NavItems from './NavItems'
import Image from 'next/image'

const MobileNav = () => {
  return (
    <nav className='md:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <Image
            src={'/icons/bars-solid.svg'}
            alt='menu'
            width={24}
            height={24}
            className='cursor-pointer ml-2' />

        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-yellow-500 lg:hidden' side={'left'}>
          <div className='flex flex-row items-center'>
            <Image
              className='rounded-full border-2 border-black'
              src={'/logo.png'}
              alt='logo'
              width={50}
              height={50}
            />
            <p className='font-bold text-[18px] ml-2 text-black'>Main Menu</p>
          </div>
          <NavItems />
        </SheetContent>
      </Sheet>

    </nav>
  )
}

export default MobileNav