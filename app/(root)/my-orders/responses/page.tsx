import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center bg-white h-full'>
            <div className='w-full flex flex-col max-w-[1200px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full rounded-lg mb-auto'>
                    <div className='w-11/12 p-8 my-3 rounded-lg bg-white text-black'>
                        <div className='flex flex-row justify-around items-center my-3 font-bold'>
                            <Link href={'/my-orders/requests'} className='flex flex-row  justify-center items-center gap-3 bg-yellow-500 px-4 py-3 text-center w-full rounded-l-lg'>
                                <Image src={'/icons/up.svg'} alt='up' height={20} width={20} />
                                <p>Requests</p>
                            </Link>
                            <Link href={'/my-orders/responses'} className='flex flex-row justify-center items-center gap-3 bg-green-500 px-4 py-3 text-center w-full rounded-r-lg'>
                                <Image src={'/icons/down.svg'} alt='up' height={20} width={20} className='rotate-180' />
                                <p>Responses</p>
                            </Link>
                        </div>
                        <p className='font-semibold mb-3 text-[18px] my-4'>Awaiting Review</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default page