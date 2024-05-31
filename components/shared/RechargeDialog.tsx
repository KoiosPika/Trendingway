'use client'

import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { formatDate } from '@/lib/utils'
import { IOrder } from '@/lib/database/models/order.model'
import { getOrderById } from '@/lib/actions/order.actions'

const RechargeDialog = ({ order }: { order: IOrder }) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex flex-row w-full justify-center items-center px-2 py-3 gap-2 bg-white text-black rounded-lg relative hover:bg-yellow-500'>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>${(order?.amount).toFixed(2)}</p>
                </div>
                <div className='w-full flex flex-row items-center'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(order?.createdAt)}</p>
                </div>
                <div className='w-full flex flex-row items-center gap-2'>
                    <p className='font-semibold text-[12px] lg:text-[15px]'>Details</p>
                    <p className='font-semibold text-[12px] lg:text-[15px] text-white bg-black rounded-full px-1'>{'->'}</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-black font-bold">Order Details:</p>
                        <AlertDialogCancel className="rounded-full bg-black text-white hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p>Order ID: {order?._id}</p>
                <p>Amount: {order?.amount}</p>
                <p>Date: {formatDate(order?.createdAt)}</p>
                <p>Time: {formatDate(order?.createdAt)}</p>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RechargeDialog