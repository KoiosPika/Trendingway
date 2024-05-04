import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-3/4 bg-slate-100'>
                        <p className='text-[18px] font-semibold my-4'>Request Review</p>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Video Link: (60s and less)</p>
                            <Input className='w-full border-2 border-black text-[16px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Describe what you need help with:</p>
                            <Input className='w-full border-2 border-black text-[16px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Select the platform:</p>
                            <div className='grid grid-cols-3 w-full gap-3 bg-white rounded-md font-semibold border-2 border-black'>
                                <p className='text-center p-2 bg-blue-600 text-white text-[13px] md:text-[16px]'>Instagram</p>
                                <p className='text-center p-2 text-[13px] md:text-[16px]'>Youtube</p>
                                <p className='text-center p-2 text-[13px] md:text-[16px]'>Tiktok</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Number of followers (subscribers):</p>
                            <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-3 bg-white rounded-md font-semibold border-2 border-black'>
                                <p className='text-center p-2 bg-blue-600 text-white'>Any</p>
                                <p className='text-center p-2'>Over 100k</p>
                                <p className='text-center p-2'>Over 200k</p>
                                <p className='text-center p-2'>Over 500k</p>
                                <p className='text-center p-2'>Over 800k</p>
                                <p className='text-center p-2'>Over 1M</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Select the main language:</p>
                            <div className=' w-full gap-3 bg-white rounded-md font-semibold border-2 border-black'>
                                <p className='text-center p-2 bg-blue-600 rounded-t-sm text-white'>English</p>
                            </div>
                        </div>

                        <div className='bg-yellow-400 p-3 my-5 rounded-[5px] border-2 border-black font-semibold'>
                            <p>Submit Request for $1.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page