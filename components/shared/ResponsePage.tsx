'use client'

import React, { useEffect, useState } from 'react'
import { getReviewByRequestId } from '@/lib/actions/review.actions'
import { IReview } from '@/lib/database/models/review.model';
import { InstagramEmbed, TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';

const ResponsePage = ({ id }: { id: string }) => {

    const [review, setReview] = useState<IReview>()
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (review) {
            if (review?.Request.platform === 'TikTok') {
                setHeight(750)
            } else if (review?.Request.platform === 'Instagram') {
                setHeight(600)
            } else if (review?.Request.platform === 'Youtube') {
                setHeight(700);
            }
        }
    }, [review])

    useEffect(() => {
        async function getReview() {
            const thisReview = await getReviewByRequestId(id);

            setReview(thisReview)
        }

        getReview()
    }, [])


    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col md:max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-t-lg flex flex-col h-full md:h-[750px] md:flex-row justify-center items-center mt-3 p-3 w-full lg:w-4/5'>
                        {review?.Request?.platform === 'TikTok' &&
                            <div className='rounded-lg h-[750px] w-[360px]'>
                                {review && <TikTokEmbed url={review?.Request?.postLink} width={350} />}
                            </div>}
                        {review?.Request?.platform === 'Instagram' &&
                            <div className='rounded-lg h-[600px] w-[360px]'>
                                {review && <InstagramEmbed url={review?.Request?.postLink} width={350} />}
                            </div>}
                        {review?.Request?.platform === 'Youtube' &&
                            <div className='rounded-lg h-[700px] w-[360px]'>
                                {review && <YouTubeEmbed url={review?.Request?.postLink} width={350} height={height} />}
                            </div>}
                        <ScrollArea className={`w-full md:w-[400px] h-full md:h-[${height}px] bg-white rounded-tr-lg rounded-br-lg flex-col flex justify-center items-center`}>
                            <div className='mt-2 font-semibold text-center'>Review</div>
                            {review?.contentNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Content</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.contentReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>

                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.contentNotes}</p>
                            </div>}
                            {review?.brightnessNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Brightness</p>
                                <div className='flex flex-row justify-around  my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.brightnessReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.brightnessNotes}</p>
                            </div>}
                            {review?.descriptionNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Title & Description</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.descriptionReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.descriptionNotes}</p>
                            </div>}
                            {review?.hashtagsNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Hashtags</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.hashtagsReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.hashtagsNotes}</p>
                            </div>}
                            {review?.soundNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Sound</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.soundReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.soundNotes}</p>
                            </div>}
                            {review?.bioNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Bio</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.bioReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.bioNotes}</p>
                            </div>}
                            {review?.highlightsNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Highlights</p>
                                <div className='flex flex-row justify-around  my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.highlightsReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.highlightsNotes}</p>
                            </div>}
                            {review?.postsNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Posts</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Image
                                                key={index}
                                                className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                src={index < review?.postsReview ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                alt='star'
                                                width={100}
                                                height={100}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.postsNotes}</p>
                            </div>}
                            {review?.additionalNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                                <p className='w-4/5 bg-slate-300 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.additionalNotes}</p>
                            </div>}
                            {review?.reviewURL && <div className='rounded-lg h-[700px] w-[360px]'>
                                {review && <YouTubeEmbed url={review?.reviewURL} width={350} height={height} />}
                            </div>}
                            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                                <div className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                                    <p className='py-1 rounded-md font-semibold'>Rate</p>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponsePage