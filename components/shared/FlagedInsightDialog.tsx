'use client'

import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Textarea } from '../ui/textarea'
import { flagInsight } from '@/lib/actions/insight.actions'
import { useRouter } from 'next/navigation'

const FlagedInsightDialog = ({ id }: { id: string }) => {

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const handleFlagingInsight = async () => {
        if(loading){
            return;
        }

        try {
            setLoading(true);

            await flagInsight(id, message);

            router.push('/notifications/orders')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex w-full'>
                <div className='bg-red-600 text-white w-full py-2 rounded-lg font-semibold'>
                    {`It's not good`}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-red-600 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Report a Insight:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-red-600 hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p className='text-white font-bold'>{`Tell us what's wrong`}</p>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Describe the issue with the insight' />
                <div onClick={handleFlagingInsight} className='flex w-full rounded-lg bg-white py-2 justify-center items-center text-red-600 font-semibold hover:cursor-pointer'>
                    <p>{loading ? 'Submitting...' : 'Submit Report'}</p>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FlagedInsightDialog