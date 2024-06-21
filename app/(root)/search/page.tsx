import SearchUsername from '@/components/shared/SearchUsername'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full gap-5'>
                    <div className="flex w-full justify-center items-center mt-8 mb-3">
                        <Image src={'/images/uncut.png'} alt="logo" className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]" height={1000} width={1000} />
                    </div>
                    <SearchUsername />
                </div>
            </div>
        </div>
    )
}

export default page