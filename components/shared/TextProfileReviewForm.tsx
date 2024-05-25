'use client'

import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'
import { Input } from '../ui/input'
import { createTextProfileReview } from '@/lib/actions/review.actions'
import { useRouter } from 'next/navigation'

const TextProfileReviewForm = ({ height, id, reviewer }: { height: number, id: string, reviewer: string }) => {

    const [bioNotes, setBioNotes] = useState<string>('')
    const [bioReview, setBioReview] = useState<number>(1)

    const [highlightsNotes, setHighlightsNotes] = useState<string>('')
    const [highlightsReview, setHighlightsReview] = useState<number>(1)

    const [postsNotes, setPostsNotes] = useState<string>('')
    const [postsReview, setPostsReview] = useState<number>(1)

    const [additionalNotes, setAdditionalNotes] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const submitTextProfileReview = async () => {

        setLoading(true);

        const review = {
            request: id,
            bioNotes,
            bioReview,
            highlightsNotes,
            highlightsReview,
            postsNotes,
            postsReview,
            additionalNotes,
            Reviewer: reviewer
        }

        await createTextProfileReview(review)

        router.push('/wallet')

        setLoading(false);
    }

    return (
        <ScrollArea className={`w-[400px] h-full md:h-[${height}px] bg-white rounded-tr-lg rounded-br-lg flex-col items-center`}>
            <div className='mt-2 font-semibold text-center'>Review</div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Bio</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                    {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < bioReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setBioReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={bioNotes} onChange={(e) => setBioNotes(e.target.value)} placeholder='Notes about Bio' className='w-4/5 border-2 border-black text-[16px]' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Highlights and Stories</p>
                <div className='flex flex-row justify-around  my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                    {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < highlightsReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setHighlightsReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={highlightsNotes} onChange={(e) => setHighlightsNotes(e.target.value)} placeholder='Notes about Highlights:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Posts</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                    {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < postsReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setPostsReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={postsNotes} onChange={(e) => setPostsNotes(e.target.value)} placeholder='Notes about Posts:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                <Input value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                {!loading && <div onClick={submitTextProfileReview} className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                    <p className='py-1 rounded-md font-semibold'>Submit</p>
                </div>}
                {loading && <div className='w-1/3 bg-green-200 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                    <p className='py-1 rounded-md font-semibold'>Submitting</p>
                </div>}
            </div>
        </ScrollArea>
    )
}

export default TextProfileReviewForm