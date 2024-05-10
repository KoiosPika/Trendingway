import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-4/5 bg-white'>
                        <p className='text-[20px] font-semibold bg-black px-4 py-2 rounded-lg text-white'>Edit Profile</p>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>About Me:</p>
                            <Input className='w-full border-2 border-black text-[16px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Personal Link:</p>
                            <Input className='w-full border-2 border-black text-[16px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Services:</p>
                            <div className='flex flex-row w-full'>
                                <div className='bg-black text-white rounded-l-lg w-5/12 text-center flex justify-center items-center font-semibold'>1 Video Review</div>
                                <Input className='border-2 border-black rounded-l-none'/>
                            </div>
                            <div className='flex flex-row w-full'>
                                <div className='bg-black text-white rounded-l-lg w-5/12 text-center flex justify-center items-center font-semibold'>3 Video Review</div>
                                <Input className='border-2 border-black rounded-l-none'/>
                            </div>
                            <div className='flex flex-row w-full'>
                                <div className='bg-black text-white rounded-l-lg w-5/12 text-center flex justify-center items-center font-semibold'>Account Audit</div>
                                <Input className='border-2 border-black rounded-l-none'/>
                            </div>
                            <div className='my-3 bg-black p-3 rounded-lg'>
                                <p className='font-semibold text-[15px] text-white'>Save Info</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page