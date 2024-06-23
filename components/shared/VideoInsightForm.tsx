import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ScrollArea } from '../ui/scroll-area'
import { useRouter } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { useSession } from '@clerk/nextjs'
import { getSessionByUserID } from '@/lib/actions/session.actions'
import { createVideoInsight } from '@/lib/actions/insight.actions'

const VideoInsightForm = ({ height, id, insighter, user }: { height: number, id: string, insighter: string, user: string }) => {
    const [contentNotes, setContentNotes] = useState<string>('')
    const [contentRate, setContentRate] = useState<number>(1)

    const [brightnessNotes, setBrightnessNotes] = useState<string>('')
    const [brightnessRate, setBrightnessRate] = useState<number>(1)

    const [descriptionNotes, setDescriptionNotes] = useState<string>('')
    const [descriptionRate, setDescriptionRate] = useState<number>(1)

    const [hashtagsNotes, setHashtagsNotes] = useState<string>('')
    const [hashtagsRate, setHashtagsRate] = useState<number>(1)

    const [soundNotes, setSoundNotes] = useState<string>('')
    const [soundRate, setSoundRate] = useState<number>(1)

    const [additionalNotes, setAdditionalNotes] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const { session } = useSession();

    useEffect(() => {
        const checkSession = async () => {
            const currentSession = await getSessionByUserID(insighter)

            if(currentSession.sessionId != session?.id){
                router.push('/session-revoked')
            }
        };

        const intervalId = setInterval(checkSession, 1500); // Check every second

        return () => clearInterval(intervalId);
    }, []);

    const submitInsight = async () => {

        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 5000));

        if (!session?.status) {
            router.push('/session-revoked');
            return;
        }

        const insight = {
            request: id,
            User: user,
            Insighter: insighter || '',
            contentNotes: contentNotes || '',
            contentRate,
            brightnessNotes: brightnessNotes || '',
            brightnessRate,
            descriptionNotes: descriptionNotes || '',
            descriptionRate,
            hashtagsNotes: hashtagsNotes || '',
            hashtagsRate,
            soundNotes: soundNotes || '',
            soundRate,
            additionalNotes: descriptionNotes || ''
        }
        await createVideoInsight(insight)

        router.push('/activity/orders')

        setLoading(false);
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
                <Textarea value={contentNotes} onChange={(e) => setContentNotes(e.target.value)} placeholder='Notes about content:' className='w-4/5 border-2 border-black text-[16px]' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Brightness</p>
                <div className='flex flex-row justify-around  my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < brightnessRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setBrightnessRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={brightnessNotes} onChange={(e) => setBrightnessNotes(e.target.value)} placeholder='Notes about brightness:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Title & Description</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < descriptionRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setDescriptionRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={descriptionNotes} onChange={(e) => setDescriptionNotes(e.target.value)} placeholder='Notes about title & description:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Hashtags</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < hashtagsRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setHashtagsRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={hashtagsNotes} onChange={(e) => setHashtagsNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Sound</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < soundRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setSoundRate(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Textarea value={soundNotes} onChange={(e) => setSoundNotes(e.target.value)} placeholder='Notes about sound:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                <Textarea value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder='Any additional notes:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                {!loading && <div onClick={submitInsight} className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
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

export default VideoInsightForm