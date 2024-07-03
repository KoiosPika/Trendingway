'use client'

import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { IEarning } from '@/lib/database/models/earning.model'
import { formatDate, formatTime } from '@/lib/utils'
import Image from 'next/image'

const EarningDialog = ({ earning }: { earning: IEarning }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex flex-row w-full justify-center items-center px-2 py-3 gap-2 bg-white text-black rounded-lg'>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>${(earning?.amount).toFixed(2)}</p>
                </div>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(earning?.createdAt)}</p>
                </div>
                {earning.service == 'VideoInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Video Insight</p>
                    </div>}
                {earning.service == 'LongVideoInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Long Video Insight</p>
                    </div>}
                {earning.service == 'ProfileInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Profile Insight</p>
                    </div>}
                {earning.service == 'PersonalInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/question.svg'} alt='video' width={200} height={200} className='bg-pink-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Personal Insight</p>
                    </div>}
                {earning.service == 'RandomInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/gavel.svg'} alt='video' width={200} height={200} className='bg-[#3B711E] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Random Insight</p>
                    </div>}
                {earning.service == 'LongRandomInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/feather.svg'} alt='video' width={200} height={200} className='bg-[#3E2EA3] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Long Random Insight</p>
                    </div>}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#549E4D] border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Earning Details:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-[#549E4D] hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <table className='w-full text-[13px] md:text-[16px] border-collapse border border-[#549E4D]'>
                    <tbody>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#549E4D] border p-2 rounded-tl-lg border-b-[3px] border-r-[3px]'>Earning ID:</td>
                            <td className='font-bold text-black bg-white border-[#549E4D] border p-2 rounded-tr-lg border-b-[3px]'>{earning?._id}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#549E4D] border p-2 border-b-[3px] border-r-[3px]'>Service:</td>
                            <td className='font-bold text-black bg-white border-[#549E4D] border p-2 border-b-[3px]'>
                                {earning.service === 'VideoInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='text Insight' width={25} height={25} className='bg-blue-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Video Insight</p>
                                    </div>
                                )}
                                {earning.service === 'LongVideoInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='text insight' width={25} height={25} className='bg-purple-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Long Video Insight</p>
                                    </div>
                                )}
                                {earning.service === 'ProfileInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/account.svg'} alt='text profile insight' width={25} height={25} className='bg-orange-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Profile Insight</p>
                                    </div>
                                )}
                                {earning.service == 'PersonalInsight' &&
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/question.svg'} alt='video' width={25} height={25} className='bg-pink-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Personal Insight</p>
                                    </div>}
                                {earning.service === 'RandomInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/gavel.svg'} alt='text Insight' width={25} height={25} className='bg-[#3B711E] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Random Insight</p>
                                    </div>
                                )}
                                {earning.service === 'LongRandomInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/feather.svg'} alt='text insight' width={25} height={25} className='bg-[#3E2EA3] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Long Random Insight</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#549E4D] border p-2 border-b-[3px] border-r-[3px]'>Amount:</td>
                            <td className='text-black bg-white border-[#549E4D] border p-2 border-b-[3px]'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between'>
                                        <span className='font-semibold'>Total:</span>
                                        <span className='font-semibold'>${(earning?.amount + earning?.fee).toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between font-bold'>
                                        <span className='text-gray-600'>{((earning.fee / (earning?.amount + earning?.fee)) * 100).toFixed(0)}% Service Fee:</span>
                                        <span className='text-gray-600'>-${(earning?.fee).toFixed(2)}</span>
                                    </div>
                                    <hr className='my-2 border-gray-400' />
                                    <div className='flex justify-between'>
                                        <span className='font-bold'>Net Amount:</span>
                                        <span className='font-bold'>${(earning?.amount).toFixed(2)}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#549E4D] p-2 border-b-[3px] border-r-[3px]'>Date:</td>
                            <td className='font-bold text-black bg-white border-[#549E4D] border p-2 border-b-[3px]'>{formatDate(earning?.createdAt)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#549E4D] border p-2 rounded-bl-lg border-b-[3px] border-r-[3px]'>Time:</td>
                            <td className='font-bold text-black bg-white border-[#549E4D] border p-2 rounded-br-lg border-b-[3px]'>{formatTime(earning?.createdAt)}</td>
                        </tr>
                    </tbody>
                </table>
                <p className='font-bold text-[12px] md:text-[14px] ml-3 text-white'>
                    • For more information about our fees, go to
                    <a href="/guide/fees-page" className='mx-[6px] bg-yellow-400 rounded-md px-2 inline-block text-black'>
                        Fees Page
                    </a>
                </p>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EarningDialog