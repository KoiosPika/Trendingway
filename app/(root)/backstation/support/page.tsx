import Backstation from '@/components/shared/Backstation'
import Link from 'next/link'
import React from 'react'

const page = async () => {


    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <Backstation />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page