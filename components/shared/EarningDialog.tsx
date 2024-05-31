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
                <table className='w-full text-[13px] md:text-[16px]'>
                    <tbody>
                        <tr>
                            <td className='font-bold pr-2 bg-white rounded-tl-lg border-b-[3px] border-[#1AAD7A] p-2'>Order ID:</td>
                            <td className='font-bold text-black bg-white border-b-[3px] border-l-[3px] border-[#1AAD7A] rounded-tr-lg p-2'>{earning?._id}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-b-[3px] border-[#1AAD7A] p-2'>Serivce:</td>
                            <td className='font-bold text-black bg-white border-b-[3px] border-l-[3px] border-[#1AAD7A] p-2 flex flex-row items-center'>
                                {earning.service == 'TextReview' &&
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Text Review</p>
                                    </div>}
                                {earning.service == 'VideoReview' &&
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Video Review</p>
                                    </div>}
                                {earning.service == 'TextProfileReview' &&
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Text Profile Review</p>
                                    </div>}
                                {earning.service == 'VideoProfileReview' &&
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Video Profile Review</p>
                                    </div>}
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-b-[3px] border-[#1AAD7A] p-2'>Amount:</td>
                            <td className='font-bold text-black bg-white border-b-[3px] border-l-[3px] border-[#1AAD7A] p-2'>${(earning?.amount).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-b-[2px] border-[#1AAD7A] p-2'>Date:</td>
                            <td className='font-bold text-black bg-white border-b-[3px] border-l-[3px] border-[#1AAD7A] p-2'>{formatDate(earning?.createdAt)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white rounded-bl-lg p-2'>Time:</td>
                            <td className='font-bold text-black bg-white rounded-br-lg border-l-[3px] border-[#1AAD7A] p-2'>{formatTime(earning?.createdAt)}</td>
                        </tr>
                    </tbody>
                </table>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EarningDialog