import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-slate-200'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center mb-auto'>
                <div className='my-3 justify-center items-center flex flex-col w-full bg-white rounded-lg'>
                    <div className='rounded-lg flex justify-center items-center my-3 py-3 px-6 w-11/12 gap-10 bg-purple-700'>
                    <div className='w-11/12 p-8 my-3 rounded-lg bg-purple-700 text-white'>
                            <p className='font-semibold mb-3 text-[18px]'>Requests</p>
                            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 font-semibold'>
                                <div className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg'>
                                    <p className='text-[10px] md:text-[13px]'>Friday 23, 2024</p>
                                    <p className='text-[30px] md:text-[35px] mb-2'>$5.00</p>
                                    <p className='text-[10px] ml-auto mt-auto underline'>More Details →</p>
                                </div>
                                <div className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg'>
                                    <p className='text-[10px] md:text-[13px]'>Friday 23, 2024</p>
                                    <p className='text-[30px] md:text-[35px]'>$5.00</p>
                                    <p className='text-[10px] ml-auto mt-auto underline'>More Details →</p>
                                </div>
                                <div className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg'>
                                    <p className='text-[10px] md:text-[13px]'>Friday 23, 2024</p>
                                    <p className='text-[30px] md:text-[35px]'>$15.00</p>
                                    <p className='text-[10px] ml-auto mt-auto underline'>More Details →</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page