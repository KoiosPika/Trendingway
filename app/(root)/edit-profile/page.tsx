import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-4/5 bg-slate-100'>
                        <p className='text-[20px] font-semibold bg-yellow-400 p-2 rounded-lg'>Edit Profile</p>
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
                            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                <div className='bg-[#3A51AE] h-[200px] w-[180px] rounded-[8px] p-5 text-white flex flex-col items-center'>
                                    <h4 className='text-[17px] font-semibold mb-3 bg-red-600 w-full text-center rounded-lg'>1 Video Review</h4>
                                    <Image src={'/icons/reel.png'} className='h-[100px] w-[100px]' alt='icon' height={1000} width={1000} />
                                    <div className='mt-auto bg-yellow-300 w-full text-center rounded-lg py-1 text-black font-semibold'>
                                        <p>$0.99</p>
                                    </div>
                                </div>
                                <div className='bg-[#3A51AE] h-[200px] w-[180px] rounded-[8px] p-5 text-white flex flex-col items-center'>
                                    <h4 className='text-[17px] font-semibold mb-3 bg-red-600 w-full text-center rounded-lg'>3 Video Review</h4>
                                    <Image src={'/icons/reels.png'} className='h-[100px] w-[190px]' alt='icon' height={1000} width={1000} />
                                    <div className='mt-auto bg-yellow-300 w-full text-center rounded-lg py-1 text-black font-semibold'>
                                        <p>$2.99</p>
                                    </div>
                                </div>
                                <div className='bg-[#3A51AE] h-[200px] w-[180px] rounded-[8px] p-5 text-white flex flex-col items-center'>
                                    <h4 className='text-[17px] font-semibold mb-3 bg-red-600 w-full text-center rounded-lg'>Account Review</h4>
                                    <Image src={'/icons/reel.png'} className='h-[100px] w-[100px]' alt='icon' height={1000} width={1000} />
                                    <div className='mt-auto bg-yellow-300 w-full text-center rounded-lg py-1 text-black font-semibold'>
                                        <p>$5.99</p>
                                    </div>
                                </div>
                            </div>
                            <div className='my-3 bg-yellow-400 p-3 rounded-lg'>
                                <p className='font-semibold text-[15px]'>Save Info</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page