'use client'

import { Links } from '@/constants'
import { getUserbyUserId } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {

  const pathname = usePathname();

  const Links = [
    {
      label: 'Profile',
      icon: '/assets/icons/trophy.svg',
      route: `/profile`
    },
    {
      label: 'Top Reviewers',
      icon: '/assets/icons/email.svg',
      route: '/top-reviewers'
    },
    {
      label: 'Wallet',
      icon: '/assets/icons/email.svg',
      route: '/wallet'
    },
    {
      label: 'Contact Us',
      icon: '/assets/icons/email.svg',
      route: '/contact-us'
    },
  ]


  return (
    <ul className='flex flex-col gap-10 md:flex-row'>
      {Links.map((link) => {
        const isActive = pathname === link.route
        return (
          <li
            key={link.route}
            className={`text-black flex-center whitespace-nowrap hover:text-black hover:bg-yellow-300 p-1 rounded-md`}
          >
            <Image src={link.icon} alt='icon' height={25} width={25} className='mr-5 ml-2 md:hidden' />
            <Link className='text-[16px] font-bold' href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems