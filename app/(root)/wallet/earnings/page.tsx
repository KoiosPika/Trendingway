import StripeSetup from '@/components/shared/StripeSetup';
import { getAllEarnings, getAvailableEarnings } from '@/lib/actions/earning.actions';
import { getAllTransfers } from '@/lib/actions/transfer.actions';
import { getUserFinancials } from '@/lib/actions/userFinancials.actions';
import { IEarning } from '@/lib/database/models/earning.model';
import { ITransfer } from '@/lib/database/models/transfer.model';
import { IUserFinancials } from '@/lib/database/models/userFinancials.model';
import { formatDate } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user: IUserFinancials = await getUserFinancials(userId)

    const earnings = await getAllEarnings(userId);

    const transfers = await getAllTransfers(userId)

    const data: any = await getAvailableEarnings(userId)

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='w-11/12 bg-blue-600 p-4 md:p-8 my-2 rounded-lg' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-row items-center gap-2'>
                                <Image className='rounded-md md:h-[40px] md:w-[40px] h-[30px] w-[30px]' src={'/icons/invoice.svg'} alt='stripe' height={200} width={200} />
                                <p className='font-bold md:text-[20px] text-[17px] text-white'>Transfer Information</p>
                            </div>
                            <div className='w-full md:w-11/12 gap-1 ml-[5px] mt-3 md:ml-[45px]'>
                                <div className='flex flex-row items-center w-full gap-[5px] font-bold text-[12px] md:text-[17px]'>
                                    <p className='w-1/2 bg-white text-center py-1 rounded-l-lg'>Available for transfer:</p>
                                    <p className='w-1/2 bg-white text-center py-1 rounded-r-lg'>${(data.availableEarning)?.toFixed(2)}</p>
                                </div>
                            </div>
                            <Link href={'/wallet/earnings/transfers'} className='bg-[#388931] flex justify-center items-center rounded-lg ml-auto md:w-2/5 w-2/3 py-2 mt-5 md:mr-5 border-[2px] border-white'>
                                <p className='text-white font-bold text-[10px] md:text-[14px]'>View Details and Transfer {`->`}</p>
                            </Link>

                        </div>
                        <StripeSetup userId={userId} account_id={user?.expressAccountID || ''} onboardingCompleted={user?.onboardingCompleted} />
                        <div className='grid grid-cols-1 md:grid-cols-2 w-11/12 gap-3 md:mt-5'>
                            <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-[#549E4D] text-white md:h-[400px] h-[360px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row items-center gap-2 mb-4 ml-3 md:ml-0'>
                                    <Image src={'/icons/invoice.svg'} alt='wallet' height={200} width={200} className='md:h-[40px] md:w-[40px] h-[30px] w-[30px]' />
                                    <p className='font-bold md:text-[20px] text-[17px]'>Earnings</p>
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
                                    </div>
                                    {earnings.length > 0 && earnings.map((earning: IEarning, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center px-2 py-4 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>${(earning?.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(earning?.createdAt)}</p>
                                            </div>
                                            {earning.service == 'VideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {earning.service == 'LongVideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-purple-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}

                                            {earning.service == 'ProfileInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />

                                                </div>}
                                            {earning.service == 'PersonalInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/question.svg'} alt='video' width={200} height={200} className='bg-pink-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {earning.service == 'RandomInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/gavel.svg'} alt='video' width={200} height={200} className='bg-[#3B711E] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {earning.service == 'LongRandomInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/feather.svg'} alt='video' width={200} height={200} className='bg-[#3E2EA3] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                        </div>
                                    ))}
                                    {earnings.length > 0 && <Link href={'/wallet/earnings/details'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>}
                                </div>
                                {earnings.length == 0 &&
                                    <div className='flex justify-center items-center h-3/4'>
                                        <p className='text-[18px] font-bold'>No Earnings Yet</p>
                                    </div>
                                }
                            </div>
                            <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-red-500 text-white md:h-[400px] h-[360px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row items-center gap-2 mb-4 ml-3 md:ml-0'>
                                    <Image src={'/icons/invoice.svg'} alt='wallet' height={200} width={200} className='md:h-[40px] md:w-[40px] h-[30px] w-[30px]' />
                                    <p className='font-semibold md:text-[20px] text-[17px]'>Transfers</p>
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
                                    </div>
                                    {transfers.map((transfer: ITransfer, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center p-5 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>${(transfer.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>{formatDate(transfer.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {transfers.length > 0 && <Link href={'/wallet/earnings/transfer-details'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>}
                                </div>
                                {transfers.length == 0 &&
                                    <div className='flex justify-center items-center h-3/4'>
                                        <p className='text-[18px] font-bold'>No Transfers Yet</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page