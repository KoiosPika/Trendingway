import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ScrollArea } from '../ui/scroll-area'
import { useRouter } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { createRandomInsight } from '@/lib/actions/insight.actions'

const RandomInsightForm = ({ height, id, insighter, user }: { height: number, id: string, insighter: string, user: string }) => {
    const [contentNotes, setContentNotes] = useState<string>('')
    const [contentRate, setContentRate] = useState<number>(1)

    const [status, setStatus] = useState<'Ready' | 'Loading' | 'Error' | 'Success'>('Ready')
    const router = useRouter();

    const submitInsight = async () => {

        setStatus('Loading');

        const insight = {
            request: id,
            User: user,
            Insighter: insighter || '',
            contentNotes: contentNotes || '',
            contentRate,
        }
        const response = await createRandomInsight(insight)

        if (!response) {
            setStatus('Error')
        } else {
            setStatus('Success')
        }

        router.push('/activity/orders')
    }

    return (
        <ScrollArea className={`w-[400px] bg-white rounded-tr-lg rounded-br-lg flex flex-col items-center`} style={{ height }}>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Content</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < contentRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setContentRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={contentNotes} onChange={(e) => setContentNotes(e.target.value)} placeholder='Your Opinion:' className='w-4/5 border-2 border-black text-[16px]' />
            </div>
            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                {status === 'Ready' && <div onClick={submitInsight} className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
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

export default RandomInsightForm