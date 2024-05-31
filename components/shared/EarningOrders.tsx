'use client'

import { getAllEarnings } from '@/lib/actions/earning.actions'
import { IEarning } from '@/lib/database/models/earning.model'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const EarningOrders = ({ userId }: { userId: string }) => {

    const [earnings, setEarnings] = useState<IEarning[]>()

    useEffect(() => {
        async function getOrders() {
            const requestedEarnings = await getAllEarnings(userId)
            setEarnings(requestedEarnings);
        }

        getOrders()
    }, [])

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='w-11/12 p-4 md:p-8 my-3 rounded-lg bg-[#1AAD7A] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Earnings</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/dollar-black.svg'} alt='dollar' height={12} width={12} />
                                        <p className='text-[13px] lg:text-[15px]'>Amount</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                        <p className='text-[13px] lg:text-[15px]'>When</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                        <p className='text-[13px] lg:text-[15px]'>Service</p>
                                    </div>
                                </div>
                                {earnings && earnings.map((earning: IEarning, index: number) => (
                                    <div key={index} className='flex flex-row justify-center items-center px-2 py-3 gap-2 bg-white text-black rounded-lg relative'>
                                        <div className='w-full flex flex-row items-center'>
                                            <p className='font-semibold text-[12px] lg:text-[15px]'>${(earning?.amount).toFixed(2)}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center'>
                                            <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(earning?.createdAt)}</p>
                                        </div>
                                        {earning.service == 'TextReview' &&
                                            <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                                                <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Text Review</p>
                                            </div>}
                                        {earning.service == 'VideoReview' &&
                                            <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                                                <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Video Review</p>
                                            </div>}
                                        {earning.service == 'TextProfileReview' &&
                                            <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                                                <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Text Profile Review</p>
                                            </div>}
                                        {earning.service == 'VideoProfileReview' &&
                                            <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                                                <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Video Profile Review</p>
                                            </div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarningOrders