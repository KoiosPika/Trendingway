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
          <div className='my-3 justify-center items-center flex flex-col w-full lg:gap-7'>

            <div className='grid md:grid-cols-2 grod-cols-1 w-10/12 gap-5 md:gap-3 mt-5'>
              <div className='bg-yellow-400 w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] flex flex-col justify-center items-center rounded-[40px] place-self-center'>
                <p className='font-bold text-[30px] md:text-[25px] lg:text-[30px] mr-auto ml-4'>Welcome to</p>
                <p className='font-bold text-[55px] md:text-[45px] lg:text-[55px] ml-auto mr-4'>Insightend</p>
                <p className='font-bold text-[18px] md:text-[15px] lg:text-[18px] ml-auto mr-4'>Platform for insighters</p>
                <Link href={'/'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/book.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Full Guide</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] flex justify-center items-center'>
                <Image src={'/images/image_1.png'} alt='image' height={500} width={500} className='rounded-[40px] w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]' />
              </div>
            </div>

            <div className='grid md:grid-cols-2 grod-cols-1 w-10/12 gap-5 md:gap-3'>
              <div className='bg-white h-[350px] md:flex justify-center items-center hidden'>
                <Image src={'/images/image_2.png'} alt='image' height={500} width={500} className='rounded-[40px] w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]' />
              </div>
              <div className='bg-yellow-400 w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] flex flex-col justify-center items-center rounded-[40px] place-self-center'>
                <p className='font-bold text-[30px] md:text-[25px] lg:text-[30px] mr-auto ml-4'>Connect with</p>
                <p className='font-bold text-[57px] md:text-[45px] lg:text-[57px] ml-auto mr-4'>Insighters</p>
                <p className='font-bold text-[18px] md:text-[15px] lg:text-[18px] ml-auto mr-4'>And request their insights</p>
                <Link href={'/search'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/search.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Search</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] flex justify-center items-center md:h-[0px]'>
                <Image src={'/images/image_2.png'} alt='image' height={500} width={500} className='rounded-[40px] w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] block md:hidden' />
              </div>
            </div>

            <div className='grid md:grid-cols-2 grod-cols-1 w-10/12 gap-5 md:gap-3'>
              <div className='bg-yellow-400 w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] flex flex-col justify-center items-center rounded-[40px] place-self-center'>
                <p className='font-bold text-[30px] md:text-[25px] lg:text-[30px] mr-auto ml-4'>If you have any</p>
                <p className='font-bold text-[55px] md:text-[45px] lg:text-[55px] ml-auto mr-4'>Questions</p>
                <p className='font-bold text-[18px] md:text-[15px] lg:text-[18px] ml-auto mr-4'>Please contact us</p>
                <Link href={'/'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/email-white.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Contact Us</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] flex justify-center items-center'>
                <Image src={'/images/image_3.png'} alt='image' height={500} width={500} className='rounded-[40px] w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]' />
              </div>
            </div>

            <div className='grid md:grid-cols-2 grod-cols-1 w-10/12 gap-5 md:gap-3'>
              <div className='bg-white h-[350px] md:flex justify-center items-center hidden'>
                <Image src={'/images/image_4.png'} alt='image' height={500} width={500} className='rounded-[40px] w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]' />
              </div>
              <div className='bg-yellow-400 w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] flex flex-col justify-center items-center rounded-[40px] place-self-center'>
                <p className='font-bold text-[30px] md:text-[25px] lg:text-[30px] mr-auto ml-4'>Checkout our</p>
                <p className='font-bold text-[42px] md:text-[35px] lg:text-[42px] ml-auto mr-4'>Privacy Policy</p>
                <p className='font-bold text-[18px] md:text-[15px] lg:text-[18px] ml-auto mr-4'>For data information</p>
                <Link href={'/search'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/privacy.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Privacy Policy</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] flex justify-center items-center md:h-[0px]'>
                <Image src={'/images/image_4.png'} alt='image' height={500} width={500} className='rounded-[40px] w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] block md:hidden' />
              </div>
            </div>

            <div className='grid md:grid-cols-2 grod-cols-1 w-10/12 gap-5 md:gap-3'>
              <div className='bg-yellow-400 w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] flex flex-col justify-center items-center rounded-[40px] place-self-center'>
                <p className='font-bold text-[30px] md:text-[25px] lg:text-[30px] mr-auto ml-4'>Please read our</p>
                <p className='font-bold text-[44px] md:text-[38px] lg:text-[44px] ml-auto mr-4'>Terms of Use</p>
                <p className='font-bold text-[18px] md:text-[15px] lg:text-[18px] ml-auto mr-4'>Before using our platform</p>
                <Link href={'/'} className='ml-auto mr-[30px] mt-5 flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                  <Image src={'/icons/list-white.svg'} alt='guide' height={20} width={20} />
                  <p className='text-white font-semibold text-[17px]'>Terms of Use</p>
                </Link>
              </div>
              <div className='bg-white h-[350px] flex justify-center items-center'>
                <Image src={'/images/image_5.png'} alt='image' height={500} width={500} className='rounded-[40px] w-[350px] h-[350px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page