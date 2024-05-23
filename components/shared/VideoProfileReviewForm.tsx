'use client'

import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'
import { Input } from '../ui/input'
import { createVideoProfileReview } from '@/lib/actions/review.actions'

const VideoProfileReviewForm = ({ height, id, reviewer }: { height: number, id: string, reviewer: string }) => {
    const [URL, setURL] = useState('')

    const submitVideoProfileReview = async () => {
        const review = {
            request: id,
            videoURL: URL, 
            Reviewer: reviewer
        }

        await createVideoProfileReview(review)
    }

    return (
        <ScrollArea className={`w-[400px] h-full md:h-[${height}px] bg-white rounded-tr-lg rounded-br-lg flex-col items-center`}>
            <div className='mt-2 font-semibold text-center'>Review</div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Video Link:</p>
                <Input value={URL} onChange={(e) => setURL(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                <div onClick={submitVideoProfileReview} className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                    <p className='py-1 rounded-md font-semibold'>Submit</p>
                </div>
            </div>
        </ScrollArea>
    )
}

export default VideoProfileReviewForm