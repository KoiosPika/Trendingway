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
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#1AAD7A] border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Order Details:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-[#1AAD7A] hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <table className='w-full text-[13px] md:text-[16px] border-collapse border border-[#1AAD7A]'>
                    <tbody>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#1AAD7A] border p-2 rounded-tl-lg border-b-[3px] border-r-[3px]'>Order ID:</td>
                            <td className='font-bold text-black bg-white border-[#1AAD7A] border p-2 rounded-tr-lg border-b-[3px]'>{earning?._id}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#1AAD7A] border p-2 border-b-[3px] border-r-[3px]'>Service:</td>
                            <td className='font-bold text-black bg-white border-[#1AAD7A] border p-2 border-b-[3px]'>
                                {earning.service === 'TextReview' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='text review' width={25} height={25} className='bg-blue-500 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Text Review</p>
                                    </div>
                                )}
                                {earning.service === 'VideoReview' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='video review' width={25} height={25} className='bg-red-500 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Video Review</p>
                                    </div>
                                )}
                                {earning.service === 'TextProfileReview' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/account.svg'} alt='text profile review' width={25} height={25} className='bg-orange-500 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Text Profile Review</p>
                                    </div>
                                )}
                                {earning.service === 'VideoProfileReview' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/video-icon.svg'} alt='video profile review' width={25} height={25} className='bg-green-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Video Profile Review</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#1AAD7A] border p-2 border-b-[3px] border-r-[3px]'>Amount:</td>
                            <td className='text-black bg-white border-[#1AAD7A] border p-2 border-b-[3px]'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between'>
                                        <span className='font-semibold'>Total:</span>
                                        <span className='font-semibold'>${(earning?.amount / 0.8).toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between font-bold'>
                                        <span className='text-gray-600'>20% Service Fee:</span>
                                        <span className='text-gray-600'>-${(earning?.amount * 0.2 / 0.8).toFixed(2)}</span>
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
                            <td className='font-bold pr-2 bg-white border-[#1AAD7A] p-2 border-b-[3px] border-r-[3px]'>Date:</td>
                            <td className='font-bold text-black bg-white border-[#1AAD7A] border p-2 border-b-[3px]'>{formatDate(earning?.createdAt)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#1AAD7A] border p-2 rounded-bl-lg border-b-[3px] border-r-[3px]'>Time:</td>
                            <td className='font-bold text-black bg-white border-[#1AAD7A] border p-2 rounded-br-lg border-b-[3px]'>{formatTime(earning?.createdAt)}</td>
                        </tr>
                    </tbody>
                </table>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EarningDialog