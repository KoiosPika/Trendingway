'use client'

import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { IRequest } from '@/lib/database/models/request.model'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { cancelOrder } from '@/lib/actions/request.actions'

const CancelOrder = ({ request }: { request: IRequest }) => {

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleCancelingOrder = async () => {
        if (!message.trim()) {
            alert('Please provide a reason for canceling the order.');
            return;
        }

        setLoading(true);

        try {
            await cancelOrder(request._id, message);
            setLoading(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='w-full'>
                <div className='bg-red-500 w-full flex flex-row items-center justify-center h-[30px] rounded-lg mt-1 mb-2 text-white'>
                    <p className='text-[13px] md:text-[16px] font-bold'>X Cancel Order</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-red-500 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Cancel Order</p>
                        <AlertDialogCancel className="rounded-full bg-white text-red-500 hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p className='text-white ml-2'>Are you sure you want to cancel this order?</p>
                <p className='text-white font-semibold ml-2'>You can earn ${(request.price * 0.80).toFixed(2)} from this order</p>
                <Textarea
                    className='text-[16px] h-[40px]'
                    placeholder={`Tell the customer why you're canceling their order`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <div
                    onClick={handleCancelingOrder}
                    className={`flex w-full ${loading ? 'bg-gray-500' : 'bg-blue-900'} text-white justify-center items-center py-2 rounded-lg hover:cursor-pointer mt-2`}
                >
                    {loading ? <p>Loading...</p> : <p>Yes, Cancel Order</p>}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CancelOrder