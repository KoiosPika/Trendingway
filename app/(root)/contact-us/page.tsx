import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-slate-300'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-[50px] p-3 w-full md:w-4/5 bg-white'>
                        <p className='text-[20px] font-semibold my-5'>Contact Us</p>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Email:</p>
                            <Input className='w-full border-2 border-black text-[16px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>How can we help you:</p>
                            <Input className='w-full border-2 border-black text-[16px] h-[150px]' />
                        </div>
                        <div className='my-5 bg-purple-700 text-white w-4/5 text-center p-2 rounded-lg'>
                            <p className='font-semibold'>Submit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page