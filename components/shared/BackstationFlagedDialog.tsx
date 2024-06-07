'use client'

import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { IReview } from '@/lib/database/models/review.model'
import { formatDateUS } from '@/lib/utils'
import Link from 'next/link'
import { refundOrder } from '@/lib/actions/refund.actions'
import { createEarning } from '@/lib/actions/earning.actions'
import { useRouter } from 'next/navigation'

const BackstationFlagedDialog = ({ review }: { review: IReview }) => {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleRefund = async () => {
        setLoading(true)
        await refundOrder(review?.Request?._id)
        router.refresh();
    }

    const handleEarning = async () => {
        setLoading(true)
        await createEarning(review?._id)
        router.refresh();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex w-full hover:bg-yellow-500 px-2 py-4'>
                <div className='w-full flex flex-row items-center gap-5'>
                    <p className='font-semibold text-[13px] lg:text-[15px]'>{review?.User?.username}</p>
                </div>
                <div className='w-full flex flex-row items-center gap-5'>
                    <p className='font-semibold text-[13px] lg:text-[15px]'>{formatDateUS(review?.createdAt)}</p>
                </div>
                <div className='w-full flex flex-row items-center gap-5'>
                    <p className='font-semibold text-[13px] lg:text-[15px]'>${review?.Request?.price}</p>
                </div>
                <div className='w-full flex flex-row items-center gap-5'>
                    <p className='font-semibold text-[13px] lg:text-[15px]'>{review?.Request?.type}</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-400 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Report</p>
                        <AlertDialogCancel className="rounded-full bg-white text-blue-600 hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p className='flex w-full bg-slate-300 px-2 py-3 rounded-lg font-semibold text-[15px]'>
                    {review?.reportMessage}
                </p>
                <div className='flex flex-col justify-center items-center'>
                    <Link href={`/notifications/responses/${review?.Request?._id}`} target='_blank' className='flex justify-center items-center w-1/2 bg-white py-2 rounded-md'>
                        <p className='text-blue-500 font-bold'>Go To Review</p>
                    </Link>
                    {!loading && <div className='flex w-full items-center my-3 gap-2'>
                        <div onClick={handleRefund} className='flex w-1/2 justify-center items-center bg-red-600 py-2 text-white font-bold rounded-lg border-[1px] border-white hover:cursor-pointer'>
                            <p>Refund</p>
                        </div>
                        <div onClick={handleEarning} className='flex w-1/2 justify-center items-center bg-green-600 py-2 text-white font-bold rounded-lg border-[1px] border-white hover:cursor-pointer'>
                            <p>Create Earning</p>
                        </div>
                    </div>}
                    {loading && <div className='flex w-full items-center my-3 gap-2'>
                        <div onClick={handleRefund} className='flex w-1/2 justify-center items-center bg-red-300 py-2 text-white font-bold rounded-lg border-[1px] border-white hover:cursor-pointer'>
                            <p>Refund</p>
                        </div>
                        <div onClick={handleEarning} className='flex w-1/2 justify-center items-center bg-green-400 py-2 text-white font-bold rounded-lg border-[1px] border-white hover:cursor-pointer'>
                            <p>Create Earning</p>
                        </div>
                    </div>}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BackstationFlagedDialog