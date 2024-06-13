'use client'

import { IRequest } from '@/lib/database/models/request.model'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import Image from 'next/image'
import Link from 'next/link'

const CanceledOrderDialog = ({ request }: { request: IRequest }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex w-full'>
                <div className='bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2 hover:cursor-default hover:bg-red-500'>
                    <p className='text-[16px] md:text-[19px] text-white font-bold'>X</p>
                    <p className='text-[13px] md:text-[16px] text-white font-bold'>Canceled & Refunded</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-black font-bold">Order Details:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black hover:bg-black hover:text-white border-[1px] border-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p className='font-semibold'>Your order was canceled and ${request?.price} were refunded to your current balance</p>
                <p className='font-semibold'>Reason for canceling:</p>
                <div className='w-full bg-white flex items-center gap-2 rounded-b-lg'>
                    <Link href={`/profile/${request?.Insighter?.username}`} className='h-[45px] w-[45px]'>
                        <Image src={request?.User?.photo} alt='pfp' className='h-[45px] w-[45px] border-2 border-green-400 rounded-full mb-auto' height={200} width={200} />
                    </Link>
                    <div className='bg-gray-300 p-1 rounded-r-lg rounded-bl-lg flex-1'>
                        <p className='text-[15px]'>{request?.message}</p>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CanceledOrderDialog