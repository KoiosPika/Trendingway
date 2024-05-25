import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { createTextReview } from '@/lib/actions/review.actions'
import { useRouter } from 'next/navigation'

const TextReviewForm = ({ height, id, reviewer, user }: { height: number, id: string, reviewer: string, user:string }) => {
    const [contentNotes, setContentNotes] = useState<string>('')
    const [contentReview, setContentReview] = useState<number>(1)

    const [brightnessNotes, setBrightnessNotes] = useState<string>('')
    const [brightnessReview, setBrightnessReview] = useState<number>(1)

    const [descriptionNotes, setDescriptionNotes] = useState<string>('')
    const [descriptionReview, setDescriptionReview] = useState<number>(1)

    const [hashtagsNotes, setHashtagsNotes] = useState<string>('')
    const [hashtagsReview, setHashtagsReview] = useState<number>(1)

    const [soundNotes, setSoundNotes] = useState<string>('')
    const [soundReview, setSoundReview] = useState<number>(1)

    const [additionalNotes, setAdditionalNotes] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const submitReview = async () => {

        setLoading(true);

        const review = {
            request: id,
            User:user,
            Reviewer: reviewer || '',
            contentNotes: contentNotes || '',
            contentReview,
            brightnessNotes: brightnessNotes || '',
            brightnessReview,
            descriptionNotes: descriptionNotes || '',
            descriptionReview,
            hashtagsNotes: hashtagsNotes || '',
            hashtagsReview,
            soundNotes: soundNotes || '',
            soundReview,
            additionalNotes: descriptionNotes || ''
        }
        await createTextReview(review)

        router.push('/wallet')

        setLoading(false);
    }

    return (
        <ScrollArea className={`w-[400px] h-full md:h-[${height}px] bg-white rounded-tr-lg rounded-br-lg flex-col items-center`}>
            <div className='mt-2 font-semibold text-center'>Review</div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Content</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                src={index < contentReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setContentReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={contentNotes} onChange={(e) => setContentNotes(e.target.value)} placeholder='Notes about content' className='w-4/5 border-2 border-black text-[16px]' />
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
                                src={index < brightnessReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setBrightnessReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={brightnessNotes} onChange={(e) => setBrightnessNotes(e.target.value)} placeholder='Notes about brightness:' className='w-4/5 border-2 border-black' />
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
                                src={index < descriptionReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setDescriptionReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={descriptionNotes} onChange={(e) => setDescriptionNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
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
                                src={index < hashtagsReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setHashtagsReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={hashtagsNotes} onChange={(e) => setHashtagsNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
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
                                src={index < soundReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={100}
                                height={100}
                                onClick={() => setSoundReview(index + 1)}
                            />
                        ))}
                    </div>
                </div>
                <Input value={soundNotes} onChange={(e) => setSoundNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                <Input value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                {!loading && <div onClick={submitReview} className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
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

export default TextReviewForm