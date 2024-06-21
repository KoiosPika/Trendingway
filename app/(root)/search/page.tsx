import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full gap-5'>
                    <div className='grid md:grid-cols-2 grod-cols-1 w-10/12 gap-5'>
                        <Link href={'/'} className='h-[350px] rounded-xl flex justify-center items-center'>
                            <Image src={'/images/header.png'} className='h-[350px] w-[350px]' alt='header' height={1300} width={1200} />
                        </Link>
                        <div className='bg-yellow-500 h-[400px]'>
                            hello
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page