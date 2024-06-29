'use client'

import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { formatDate, formatTime } from '@/lib/utils'
import Image from 'next/image'
import { ISpending } from '@/lib/database/models/spending.model'

const SpendingDialog = ({ spending }: { spending: ISpending }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex flex-row w-full justify-center items-center px-2 py-3 gap-2 bg-white text-black rounded-lg'>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>${(spending?.amount).toFixed(2)}</p>
                </div>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(spending?.createdAt)}</p>
                </div>
                {spending.service == 'VideoInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Video Insight</p>
                    </div>}
                {spending.service == 'LongVideoInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-purple-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Long Video Insight</p>
                    </div>}
                {spending.service == 'ProfileInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Profile Insight</p>
                    </div>}
                {spending.service == 'PersonalInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/question.svg'} alt='video' width={200} height={200} className='bg-pink-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Personal Insight</p>
                    </div>}
                {spending.service == 'RandomInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/gavel.svg'} alt='video' width={200} height={200} className='bg-[#3b711e] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Random Insight</p>
                    </div>}
                {spending.service == 'LongRandomInsight' &&
                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                        <Image src={'/icons/feather.svg'} alt='video' width={200} height={200} className='bg-[#3e2ea3] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                        <p className='font-semibold text-[12px] lg:text-[14px] hidden sm:block'>Long Random Insight</p>
                    </div>}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#178EA0] border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Spending Details:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-[#1AAD7A] hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <table className='w-full text-[13px] md:text-[16px] border-collapse border border-[#178EA0]'>
                    <tbody>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#178EA0] border p-2 rounded-tl-lg border-b-[3px] border-r-[3px]'>Spending ID:</td>
                            <td className='font-bold text-black bg-white border-[#178EA0] border p-2 rounded-tr-lg border-b-[3px]'>{spending?._id}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#178EA0] border p-2 border-b-[3px] border-r-[3px]'>Service:</td>
                            <td className='font-bold text-black bg-white border-[#178EA0] border p-2 border-b-[3px]'>
                                {spending.service === 'VideoInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='text insight' width={25} height={25} className='bg-blue-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Video Insight</p>
                                    </div>
                                )}
                                {spending.service === 'LongVideoInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='text insight' width={25} height={25} className='bg-purple-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Long Video Insight</p>
                                    </div>
                                )}
                                {spending.service === 'ProfileInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/account.svg'} alt='text profile insight' width={25} height={25} className='bg-orange-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Profile Insight</p>
                                    </div>
                                )}
                                {spending.service == 'PersonalInsight' &&
                                    <div className='w-full flex flex-col sm:flex-row items-center gap-2'>
                                        <Image src={'/icons/question.svg'} alt='video' width={25} height={25} className='bg-pink-600 p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Personal Insight</p>
                                    </div>}
                                {spending.service === 'RandomInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/gavel.svg'} alt='text insight' width={25} height={25} className='bg-[#3B711E] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Random Insight</p>
                                    </div>
                                )}
                                {spending.service === 'LongRandomInsight' && (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Image src={'/icons/feather.svg'} alt='text insight' width={25} height={25} className='bg-[#3E2EA3] p-[3px] rounded-full' />
                                        <p className='font-bold text-[12px] lg:text-[14px]'>Long Random Insight</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#178EA0] border p-2 border-b-[3px] border-r-[3px]'>Amount:</td>
                            <td className='text-black bg-white border-[#178EA0] border p-2 border-b-[3px] font-bold'>
                                ${(spending?.amount).toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#178EA0] p-2 border-b-[3px] border-r-[3px]'>Date:</td>
                            <td className='font-bold text-black bg-white border-[#178EA0] border p-2 border-b-[3px]'>{formatDate(spending?.createdAt)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-[#178EA0] border p-2 rounded-bl-lg border-b-[3px] border-r-[3px]'>Time:</td>
                            <td className='font-bold text-black bg-white border-[#178EA0] border p-2 rounded-br-lg border-b-[3px]'>{formatTime(spending?.createdAt)}</td>
                        </tr>
                    </tbody>
                </table>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SpendingDialog