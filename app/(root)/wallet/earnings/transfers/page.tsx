import EarningAsPayoutDialog from '@/components/shared/EarningAsPayoutDialog';
import EarningDialog from '@/components/shared/EarningDialog';
import LoadMoreEarningsAsPayouts from '@/components/shared/LoadMoreEarningsAsPayouts';
import TransferButton from '@/components/shared/TransferButton';
import { getAvailableEarnings, getEarningsAsPayouts } from '@/lib/actions/earning.actions'
import { getUserDataByUserId } from '@/lib/actions/userData.actions';
import { IEarning } from '@/lib/database/models/earning.model';
import { IUserData } from '@/lib/database/models/userData.model';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const userData: IUserData = await getUserDataByUserId(userId)

    const earnings = await getEarningsAsPayouts(userId)

    const data: any = await getAvailableEarnings(userId)

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-11/12 bg-white'>
                        <div className='w-full md:w-11/12 px-2 py-4 md:p-8 my-3 rounded-lg bg-blue-600 text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Transfer Funds</p>
                            </div>
                            <div className='w-full gap-1 my-3 text-black'>
                                <div className='flex flex-row items-center w-full gap-[5px] font-bold text-[12px] md:text-[17px]'>
                                    <p className='w-1/2 bg-white text-center py-1 rounded-tl-lg'>Available for transfer</p>
                                    <p className='w-1/2 bg-white text-center py-1 rounded-tr-lg'>${(data.availableEarning)?.toFixed(2)}</p>
                                </div>
                                <div className='flex flex-row items-center w-full gap-[5px] font-bold text-[12px] md:text-[17px] mt-1'>
                                    <p className='w-1/2 bg-white text-center py-1 rounded-bl-lg'>Number of Insights</p>
                                    <p className='w-1/2 bg-white text-center py-1 rounded-br-lg'>{data.availableInsights}</p>
                                </div>
                                <p className='text-white font-semibold md:text-[13px] text-[11px] ml-1 mt-1'>Note: You can only process 150 Insights per transfer</p>
                                {userData.onboardingCompleted && <>
                                    {data.availableEarning == 0 && <div className='flex w-full my-2'>
                                        <p className='ml-auto px-3 py-1 bg-green-700 rounded-lg text-white font-semibold border-[1px] border-white md:text-[15px] text-[12px]'>No Funds Available</p>
                                    </div>}
                                    {(data.availableEarning > 25) && <TransferButton userId={userId} />}
                                    {(data.availableEarning > 0 && data.availableEarning < 25) && <div className='flex w-full my-2'>
                                        <p className='ml-auto px-3 py-1 bg-red-500 rounded-lg text-white font-semibold border-[1px] border-white md:text-[15px] text-[12px]'>Available Funds must be atleast $25</p>
                                    </div>}
                                </>}
                                {!userData.onboardingCompleted && <>
                                    {<div className='flex w-full my-2'>
                                        <Link href={'/wallet/earnings'} className='ml-auto px-3 py-1 bg-yellow-500 rounded-lg text-white font-semibold border-[1px] border-white md:text-[15px] text-[12px]'>Set up stripe account first</Link>
                                    </div>}
                                </>}
                            </div>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Earnings Breakdown</p>
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
                                {earnings && <LoadMoreEarningsAsPayouts userId={userId} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page