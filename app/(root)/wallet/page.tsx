import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-4/5 bg-white'>
                        <div className='flex flex-row items-center mr-auto ml-5'>
                            <Image src={'/icons/sun.svg'} alt='wallet' height={20} width={20} />
                            <p className='ml-3 my-5 text-[22px] font-semibold text-black'>Good Morning, Rami</p>
                        </div>
                        <div className='w-11/12 p-8 my-3 rounded-lg bg-black text-white'>
                            <div className='flex flex-row gap-2'>
                                <Image src={'/icons/wallet.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold'>Current Balance</p>
                            </div>
                            <p className='font-semibold mx-7 my-3 text-[22px]'>$ 10.00</p>
                            <div className='grid grid-cols-2 gap-3 text-center'>
                                <div className='bg-white text-black font-semibold p-2 rounded-lg'>$2.00</div>
                                <div className='bg-white text-black font-semibold p-2 rounded-lg'>$5.00</div>
                                <div className='bg-white text-black font-semibold p-2 rounded-lg'>$15.00</div>
                                <div className='bg-white text-black font-semibold p-2 rounded-lg'>$20.00</div>
                            </div>
                        </div>
                        <div className='w-11/12 p-8 my-3 rounded-lg bg-black text-white'>
                            <p className='font-semibold mb-3 text-[18px]'>Recent Orders</p>
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