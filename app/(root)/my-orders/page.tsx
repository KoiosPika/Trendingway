import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex justify-center bg-white h-full'>
      <div className='w-full flex flex-col max-w-[1200px] justify-center items-center'>
        <div className='my-3 justify-center items-center flex flex-col w-full rounded-lg mb-auto'>
          <div className='w-11/12 p-8 my-3 rounded-lg bg-white text-black'>
            <p className='font-semibold mb-3 text-[18px]'>Awaiting Review</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-semibold'>
              <div className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray'}}>
                <div className='flex flex-row items-center gap-2 mr-auto md:ml-2'>
                  <Image src={'/images/pfp.png'} alt='pfp' className='h-[35px] w-[35px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
                  <div>
                    <p className='text-[13px]'>Jane Doe</p>
                    <p className='text-[12px] text-slate-400'>2h ago</p>
                  </div>
                </div>
                <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'> to know if me doing something wrong to know if me doing something wrong to know if me doing something wrong</p>
                <Link href={'/review/34626'} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
                  <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                  <p className='text-[13px] md:text-[16px]'>Start Review</p>
                </Link>
              </div>
              <div className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray'}}>
                <div className='flex flex-row items-center gap-2 mr-auto md:ml-2'>
                  <Image src={'/images/pfp.png'} alt='pfp' className='h-[35px] w-[35px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
                  <div>
                    <p className='text-[13px]'>Jane Doe</p>
                    <p className='text-[12px] text-slate-400'>2h ago</p>
                  </div>
                </div>
                <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'> to know if me doing something wrong to know if me doing something wrong to know if me doing something wrong</p>
                <Link href={'/review/34626'} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
                  <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                  <p className='text-[13px] md:text-[16px]'>Start Review</p>
                </Link>
              </div><div className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray'}}>
                <div className='flex flex-row items-center gap-2 mr-auto md:ml-2'>
                  <Image src={'/images/pfp.png'} alt='pfp' className='h-[35px] w-[35px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
                  <div>
                    <p className='text-[13px]'>Jane Doe</p>
                    <p className='text-[12px] text-slate-400'>2h ago</p>
                  </div>
                </div>
                <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'> to know if me doing something wrong to know if me doing something wrong to know if me doing something wrong</p>
                <Link href={'/review/34626'} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
                  <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                  <p className='text-[13px] md:text-[16px]'>Start Review</p>
                </Link>
              </div><div className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray'}}>
                <div className='flex flex-row items-center gap-2 mr-auto md:ml-2'>
                  <Image src={'/images/pfp.png'} alt='pfp' className='h-[35px] w-[35px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
                  <div>
                    <p className='text-[13px]'>Jane Doe</p>
                    <p className='text-[12px] text-slate-400'>2h ago</p>
                  </div>
                </div>
                <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'> to know if me doing something wrong to know if me doing something wrong to know if me doing something wrong</p>
                <Link href={'/review/34626'} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
                  <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                  <p className='text-[13px] md:text-[16px]'>Start Review</p>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page