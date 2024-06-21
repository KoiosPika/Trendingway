import SearchUsername from "@/components/shared/SearchUsername"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import React from 'react'

const page = async () => {

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className='w-full flex justify-center items-center bg-white'>
        <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
          <div className='my-3 justify-center items-center flex flex-col w-full gap-5'>
            <div className='grid lg:grid-cols-2 grod-cols-1 w-10/12 gap-5 mt-5 justify-center items-center'>
              <div className='bg-yellow-400 md:h-[350px] h-[350px] md:w-[350px] w-[350px] flex flex-col justify-center items-center rounded-[40px]'>
                <p className='font-bold text-[30px] lg:text-[30px] mr-auto ml-4'>Welcome to</p>
                <p className='font-bold text-[55px] lg:text-[55px] ml-auto mr-4'>Insightend</p>
                <p className='font-bold text-[18px] lg:text-[18px] ml-auto mr-4'>Platform for insighters</p>
                <Link href={'/'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/book.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Full Guide</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] flex md:justify-center items-center'>
                <Image src={'/images/image_1.png'} alt='image' height={500} width={500} className='rounded-[40px] md:h-[350px] h-[350px] md:w-[350px] w-[350px]' />
              </div>
            </div>
            <div className='grid lg:grid-cols-2 grod-cols-1 w-10/12 gap-5 mt-5 justify-center items-center'>
              <div className='bg-white h-[350px] md:justify-center items-center hidden lg:block'>
                <Image src={'/images/image_2.png'} alt='image' height={500} width={500} className='rounded-[40px] md:h-[350px] h-[350px] md:w-[350px] w-[350px]' />
              </div>
              <div className='bg-yellow-400 md:h-[350px] h-[350px] md:w-[350px] w-[350px] flex flex-col justify-center items-center rounded-[40px]'>
                <p className='font-bold text-[30px] lg:text-[30px] mr-auto ml-4'>Connect with</p>
                <p className='font-bold text-[57px] lg:text-[57px] ml-auto mr-4'>Insighters</p>
                <p className='font-bold text-[18px] lg:text-[18px] ml-auto mr-4'>And request their insights</p>
                <Link href={'/search'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/search.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Search</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] md:justify-center items-center block lg:hidden'>
                <Image src={'/images/image_2.png'} alt='image' height={500} width={500} className='rounded-[40px] md:h-[350px] h-[350px] md:w-[350px] w-[350px]' />
              </div>
            </div>
            <div className='grid lg:grid-cols-2 grod-cols-1 w-10/12 gap-5 mt-5 justify-center items-center'>
              <div className='bg-yellow-400 md:h-[350px] h-[350px] md:w-[350px] w-[350px] flex flex-col justify-center items-center rounded-[40px]'>
                <p className='font-bold text-[30px] lg:text-[30px] mr-auto ml-4'>If you have any</p>
                <p className='font-bold text-[58px] lg:text-[58px] ml-auto mr-4'>Questions</p>
                <p className='font-bold text-[18px] lg:text-[18px] ml-auto mr-4'>Please contact us</p>
                <Link href={'/contact-us'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/email-white.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Contact Us</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] flex md:justify-center items-center'>
                <Image src={'/images/image_3.png'} alt='image' height={500} width={500} className='rounded-[40px] md:h-[350px] h-[350px] md:w-[350px] w-[350px]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page