'use client'

import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Textarea } from '../ui/textarea'
import { flagReview } from '@/lib/actions/review.actions'
import { useRouter } from 'next/navigation'

const FlagedReviewDialog = ({ id }: { id: string }) => {

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const handleFlagingReview = async () => {
        if(loading){
            return;
        }

        try {
            setLoading(true);

            await flagReview(id, message);

            router.push('/notifications/orders')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex w-full'>
                <div className='bg-red-600 text-white md:w-full w-1/2 py-2 rounded-lg font-semibold'>
                    {`It's not good`}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-red-600 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white font-bold">Report a Review:</p>
                        <AlertDialogCancel className="rounded-full bg-white text-red-600 hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p className='text-white font-bold'>{`Tell us what's wrong`}</p>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Describe the issue with the review' />
                <div onClick={handleFlagingReview} className='flex w-full rounded-lg bg-white py-2 justify-center items-center text-red-600 font-semibold hover:cursor-pointer'>
                    <p>{loading ? 'Submitting...' : 'Submit Report'}</p>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FlagedReviewDialog