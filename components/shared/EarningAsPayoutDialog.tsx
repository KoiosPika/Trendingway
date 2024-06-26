'use client'

import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { IEarning } from '@/lib/database/models/earning.model'
import { formatDate, formatDateDifference, formatTime } from '@/lib/utils'
import Image from 'next/image'

const EarningAsPayoutDialog = ({ earning }: { earning: IEarning }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex flex-row w-full justify-center items-center px-2 py-3 gap-2 bg-white text-black rounded-lg'>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-bold text-[12px] lg:text-[15px]'>${(earning?.amount).toFixed(2)}</p>
                </div>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-bold text-[12px] lg:text-[15px]'>{formatDate(earning?.createdAt)}</p>
                </div>
                {earning.service == 'VideoInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='md:text-[14px] hidden md:block font-bold mr-auto'>Video Insight</p>
                    </div>}
                {earning.service == 'LongVideoInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='md:text-[14px] hidden md:block font-bold mr-auto'>Long Video Insight</p>
                    </div>}
                {earning.service == 'ProfileInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='md:text-[14px] hidden md:block font-bold mr-auto'>Profile Insight</p>
                    </div>}
                {earning.service == 'PersonalInsight' &&
                    <div className='w-full flex items-center justify-center gap-2'>
                        <Image src={'/icons/messages.svg'} alt='video' width={200} height={200} className='bg-pink-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='md:text-[14px] hidden md:block font-bold mr-auto'>Personal Insight</p>
                    </div>}
                {formatDateDifference(earning.availableDate) && <div className='w-full flex flex-row items-center'>
                    <p className='font-bold text-[12px] lg:text-[14px] text-yellow-600'>{formatDateDifference(earning?.availableDate)}</p>
                </div>}
                {earning.withdrawn && <div className='w-full flex flex-row items-center'>
                    <p className='font-bold text-[12px] lg:text-[14px] text-red-500'>Withdrawn</p>
                </div>}
                {(!formatDateDifference(earning.availableDate) && !earning.withdrawn) && <div className='w-full flex flex-row items-center'>
                    <p className='font-bold text-[12px] lg:text-[14px] text-green-700'>Available</p>
                </div>}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-600 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Earning Details:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-blue-600 hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <table className='w-full text-[13px] md:text-[16px] border-collapse border border-blue-600'>
                    <tbody>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-blue-600 border p-2 rounded-tl-lg border-b-[3px] border-r-[3px]'>Earning ID:</td>
                            <td className='font-bold text-black bg-white border-blue-600 border p-2 rounded-tr-lg border-b-[3px]'>{earning?._id}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-blue-600 border p-2 border-b-[3px] border-r-[3px]'>Service:</td>
                            <td className='font-bold text-black bg-white border-blue-600 border p-2 border-b-[3px]'>
                                {earning.service === 'VideoInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='text Insight' width={25} height={25} className='bg-blue-500 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Video Insight</p>
                                    </div>
                                )}
                                {earning.service === 'LongVideoInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='text insight' width={25} height={25} className='bg-purple-500 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Long Video Insight</p>
                                    </div>
                                )}
                                {earning.service === 'ProfileInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/account.svg'} alt='text profile insight' width={25} height={25} className='bg-orange-500 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Profile Insight</p>
                                    </div>
                                )}
                                {earning.service == 'PersonalInsight' &&
                                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                                        <Image src={'/icons/messages.svg'} alt='video' width={200} height={200} className='bg-pink-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px] hidden sm:block'>Personal Insight</p>
                                    </div>}
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-blue-600 border p-2 border-b-[3px] border-r-[3px]'>Amount:</td>
                            <td className='text-black bg-white border-blue-600 border p-2 border-b-[3px]'>
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
                            <td className='font-bold pr-2 bg-white border-blue-600 p-2 border-b-[3px] border-r-[3px]'>Date:</td>
                            <td className='font-bold text-black bg-white border-blue-600 border p-2 border-b-[3px]'>{formatDate(earning?.createdAt)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-blue-600 border p-2 border-b-[3px] border-r-[3px]'>Time:</td>
                            <td className='font-bold text-black bg-white border-blue-600 border p-2 border-b-[3px]'>{formatTime(earning?.createdAt)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-blue-600 border p-2 border-b-[3px] border-r-[3px]'>Status:</td>
                            {earning.withdrawn && <td className='font-bold text-red-500 bg-white border-blue-600 border p-2 border-b-[3px]'>Withdrawn</td>}
                            {formatDateDifference(earning.availableDate) && <td className='font-bold text-yellow-600 bg-white border-blue-600 border p-2 border-b-[3px]'>Awaiting</td>}
                            {(!formatDateDifference(earning.availableDate) && !earning.withdrawn) && <td className='font-bold text-green-700 bg-white border-blue-600 border p-2 border-b-[3px]'>Available</td>}
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-blue-600 p-2 border-b-[3px] border-r-[3px]'>Available Date:</td>
                            <td className='font-bold text-black bg-white border-blue-600 border p-2 border-b-[3px]'>{formatDate(earning?.availableDate)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-blue-600 border p-2 rounded-bl-lg border-b-[3px] border-r-[3px]'>Available Time:</td>
                            <td className='font-bold text-black bg-white border-blue-600 border p-2 rounded-br-lg border-b-[3px]'>{formatTime(earning?.availableDate)}</td>
                        </tr>
                    </tbody>
                </table>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EarningAsPayoutDialog