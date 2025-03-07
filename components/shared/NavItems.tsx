'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {

  const pathname = usePathname();

  const Links = [
    {
      label: 'Home',
      icon: '/icons/home.svg',
      route: `/`
    },
    {
      label: 'Profile',
      icon: '/icons/user.svg',
      route: `/profile`
    },
    {
      label: 'Activity',
      icon: '/icons/bell.svg',
      route: '/activity/orders'
    },
    {
      label: 'Wallet',
      icon: '/icons/wallet-black.svg',
      route: '/wallet'
    },
    {
      label: 'Insighters',
      icon: '/icons/search-black.svg',
      route: '/search'
    },
  ]


  return (
    <ul className='flex flex-col gap-10 md:flex-row'>
      {Links.map((link) => {
        const isActive = pathname === link.route
        return (
          <li
            key={link.route}
            className={`text-black flex-center flex flex-row whitespace-nowrap hover:text-black hover:bg-yellow-300 p-2 rounded-md`}
          >
            <a href={link.route} className="flex items-center w-full text-[14px] lg:text-[16px] font-bold">
              <Image src={link.icon} alt="icon" height={20} width={20} className="mr-5 ml-2 md:hidden" />
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems