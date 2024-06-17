import EarningAsPayoutDialog from '@/components/shared/EarningAsPayoutDialog';
import EarningDialog from '@/components/shared/EarningDialog';
import { getEarningsAsPayouts } from '@/lib/actions/earning.actions'
import { IEarning } from '@/lib/database/models/earning.model';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const earnings = await getEarningsAsPayouts(userId)

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-11/12 bg-white'>
                        <div className='w-full md:w-11/12 px-2 py-4 md:p-8 my-3 rounded-lg bg-blue-600 text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                                        <Image src={'/icons/wrench.svg'} alt='dollar' height={14} width={14} />
                                        <p className='text-[13px] lg:text-[15px]'>Service</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/wrench.svg'} alt='dollar' height={14} width={14} />
                                        <p className='text-[13px] lg:text-[15px]'>Available</p>
                                    </div>
                                </div>
                                {earnings && earnings.map((earning: IEarning, index: number) => (
                                    <div key={index} className='flex w-full'>
                                        <EarningAsPayoutDialog earning={earning} />
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

export default page