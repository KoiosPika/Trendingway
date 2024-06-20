'use client'

import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { formatDate, formatTime } from '@/lib/utils'
import { ITransfer } from '@/lib/database/models/transfer.model'

const TransferDialog = ({ transfer }: { transfer: ITransfer }) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex flex-row w-full justify-center items-center px-2 py-3 gap-2 bg-white text-black rounded-lg relative hover:bg-yellow-500'>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>${(transfer?.amount).toFixed(2)}</p>
                </div>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(transfer?.createdAt)}</p>
                </div>
                <div className='w-full flex flex-row items-center gap-2'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>Details</p>
                    <p className='font-semibold text-[12px] lg:text-[15px] text-white bg-black rounded-full px-1'>{'->'}</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-red-500 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Transfer Details:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-red-500 hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <table className='w-full text-[13px] md:text-[16px]'>
                    <tbody>
                        <tr>
                            <td className='font-bold pr-2 bg-white rounded-tl-lg border-b-[3px] border-red-500 p-2'>Transfer ID:</td>
                            <td className='font-bold text-black bg-white border-b-[3px] border-l-[3px] border-red-500 rounded-tr-lg p-2'>{transfer?._id}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-b-[3px] border-red-500 p-2'>Amount:</td>
                            <td className='font-bold text-black bg-white border-b-[3px] border-l-[3px] border-red-500 p-2'>${(transfer?.amount).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white border-b-[2px] border-red-500 p-2'>Date:</td>
                            <td className='font-bold text-black bg-white border-b-[3px] border-l-[3px] border-red-500 p-2'>{formatDate(transfer?.createdAt)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold pr-2 bg-white rounded-bl-lg p-2'>Time:</td>
                            <td className='font-bold text-black bg-white rounded-br-lg border-l-[3px] border-red-500 p-2'>{formatTime(transfer?.createdAt)}</td>
                        </tr>
                    </tbody>
                </table>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default TransferDialog