'use client'

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'
import { createProfileInsight } from '@/lib/actions/insight.actions'
import { useRouter } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { useSession } from '@clerk/nextjs'
import { getSessionByUserID } from '@/lib/actions/session.actions'

const ProfileInsightForm = ({ height, id, insighter, user }: { height: number, id: string, insighter: string, user:string }) => {

    const [bioNotes, setBioNotes] = useState<string>('')
    const [bioRate, setBioRate] = useState<number>(1)

    const [highlightsNotes, setHighlightsNotes] = useState<string>('')
    const [highlightsRate, setHighlightsRate] = useState<number>(1)

    const [postsNotes, setPostsNotes] = useState<string>('')
    const [postsRate, setPostsRate] = useState<number>(1)

    const [additionalNotes, setAdditionalNotes] = useState<string>('')
    const [status, setStatus] = useState<'Ready' | 'Loading' | 'Error' | 'Success'>('Ready')
    const router = useRouter();

    const submitProfileInsight = async () => {

        setStatus('Loading');

        const insight = {
            request: id,
            bioNotes,
            bioRate,
            highlightsNotes,
            highlightsRate,
            postsNotes,
            postsRate,
            additionalNotes,
            User:user,
            Insighter: insighter
        }

        const response = await createProfileInsight(insight)

        if (!response) {
            setStatus('Error')
        } else {
            setStatus('Success')
        }

        setTimeout(() => {
            router.push('/activity/orders');
        }, 1000); 

    }

    return (
        <ScrollArea className={`w-[400px] bg-white flex flex-col items-center h-[${height}px]`}>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Bio</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                    {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < bioRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setBioRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={bioNotes} onChange={(e) => setBioNotes(e.target.value)} placeholder='Notes about Bio' className='w-4/5 border-2 border-black text-[16px]' />
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
                                src={index < highlightsRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setHighlightsRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={highlightsNotes} onChange={(e) => setHighlightsNotes(e.target.value)} placeholder='Notes about Highlights:' className='w-4/5 border-2 border-black' />
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
                                src={index < postsRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setPostsRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={postsNotes} onChange={(e) => setPostsNotes(e.target.value)} placeholder='Notes about Posts:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                <Textarea value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
            {status === 'Ready' && <div onClick={submitProfileInsight} className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                    <p className='py-1 rounded-md font-semibold'>Submit</p>
                </div>}
                {status === 'Loading' && <div className='w-1/3 bg-green-200 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <p className='py-1 rounded-md font-semibold'>Submitting</p>
                </div>}
                {status === 'Error' && <div className='w-1/3 bg-red-500 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <p className='py-1 rounded-md font-semibold text-white'>Error! Try Again</p>
                </div>}
                {status === 'Success' && <div className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <p className='py-1 rounded-md font-semibold'>Submitted!</p>
                </div>}
            </div>
        </ScrollArea>
    )
}

export default ProfileInsightForm