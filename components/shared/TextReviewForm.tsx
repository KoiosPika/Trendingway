import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { createTextReview } from '@/lib/actions/review.actions'

const TextReviewForm = ({ height, id, reviewer }: { height: number, id: string, reviewer: string }) => {
    const [contentNotes, setContentNotes] = useState<string>('')
    const [brightnessNotes, setBrightnessNotes] = useState<string>('')
    const [descriptionNotes, setDescriptionNotes] = useState<string>('')
    const [hashtagsNotes, setHashtagsNotes] = useState<string>('')
    const [soundNotes, setSoundNotes] = useState<string>('')
    const [additionalNotes, setAdditionalNotes] = useState<string>('')

    const submitReview = async () => {
        const review = {
            request: id,
            Reviewer: reviewer || '',
            contentNotes: contentNotes || '',
            brightnessNotes: brightnessNotes || '',
            descriptionNotes: descriptionNotes || '',
            hashtagsNotes: hashtagsNotes || '',
            soundNotes: soundNotes || '',
            additionalNotes: descriptionNotes || ''
        }
        await createTextReview(review)
    }

    return (
        <ScrollArea className={`hidden md:block w-[400px] h-[${height}px] bg-white rounded-tr-lg rounded-br-lg flex-col items-center`}>
            <div className='mt-2 font-semibold text-center'>Review</div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Content</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                    </div>
                </div>
                <Input value={contentNotes} onChange={(e) => setContentNotes(e.target.value)} placeholder='Notes about content' className='w-4/5 border-2 border-black text-[16px]' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Brightness</p>
                <div className='flex flex-row justify-around  my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                    </div>
                </div>
                <Input value={brightnessNotes} onChange={(e) => setBrightnessNotes(e.target.value)} placeholder='Notes about brightness:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Title & Description</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                    </div>
                </div>
                <Input value={descriptionNotes} onChange={(e) => setDescriptionNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Hashtags</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                    </div>
                </div>
                <Input value={hashtagsNotes} onChange={(e) => setHashtagsNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Sound</p>
                <div className='flex flex-row justify-around my-3'>
                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-yellow.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                        <Image className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' src={'/icons/star-grey.svg'} alt='star' width={100} height={100} />
                    </div>
                </div>
                <Input value={soundNotes} onChange={(e) => setSoundNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                <Input value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
            </div>
            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                <div onClick={submitReview} className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                    <p className='py-1 rounded-md font-semibold'>Submit</p>
                </div>
            </div>
        </ScrollArea>
    )
}

export default TextReviewForm