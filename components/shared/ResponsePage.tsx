'use client'

import React, { useEffect, useState } from 'react'
import { flagReview, getReviewByRequestId } from '@/lib/actions/review.actions'
import { IReview } from '@/lib/database/models/review.model';
import { InstagramEmbed, TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import RatingDialog from './RatingDialog';
import { Button } from '../ui/button';
import { getTimeLeft, timeAgo } from '@/lib/utils';
import { createEarning } from '@/lib/actions/earning.actions';
import { useRouter } from 'next/navigation';
import FlagedReviewDialog from './FlagedReviewDialog';

const ResponsePage = ({ id, userId }: { id: string, userId: string }) => {

    const [review, setReview] = useState<IReview>()
    const [height, setHeight] = useState(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [renderPage, setRenderPage] = useState<boolean>(false)
    const router = useRouter();
    const now = new Date();

    useEffect(() => {
        if (review) {
            if (review?.Request.platform === 'TikTok') {
                setHeight(950)
            } else if (review?.Request.platform === 'Instagram') {
                setHeight(750)
            } else if (review?.Request.platform === 'Youtube') {
                setHeight(950);
            }
        }
    }, [review])

    useEffect(() => {
        async function getReview() {
            const thisReview = await getReviewByRequestId(id);

            if (thisReview?.User?._id != userId) {
                router.push('/profile')
            } else {
                setRenderPage(true);
            }

            setReview(thisReview)
        }

        getReview()
    }, [])

    const handleCreateEarning = async () => {
        try {
            setLoading(true);
            if (review) {
                await createEarning(review?._id);
            }

            router.push('/notifications/orders')

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {renderPage && <div className='w-full flex justify-center items-center bg-white h-full'>
                <div className='w-full flex flex-col md:max-w-[1000px] justify-center items-center'>
                    <div className='my-3 justify-center items-center flex flex-col w-full'>
                        {(loading == false && review?.insightful == 'Awaiting' && new Date(review?.insightPeriod).getTime() > now.getTime()) && <div className='w-full lg:w-4/6 py-[14px] px-[10px] bg-black flex flex-col justify-center items-center gap-2 rounded-lg m-2'>
                            <p className='text-white font-semibold text-[12px] md:text-[14px]'>You have {getTimeLeft(review.insightPeriod)} days remaining to inform us if there are any issues with the service you received. </p>
                            <div className='flex flex-row w-full items-center gap-3'>
                                <Button className='bg-green-600 hover:bg-green-600 w-full text-[16px]' onClick={handleCreateEarning}>
                                    {`It's good`}
                                </Button>
                                <FlagedReviewDialog id={review?._id || ''} />
                            </div>
                        </div>}
                        {(loading == true && review?.insightful == 'Awaiting') && <div className='w-full lg:w-4/6 py-[14px] px-[10px] bg-black flex flex-col justify-center items-center gap-2 rounded-lg m-2'>
                            <p className='text-white font-semibold text-[12px] md:text-[14px]'>You have 3 days remaining to inform us if there are any issues with the service you received. </p>
                            <div className='flex flex-row w-full items-center gap-3'>
                                <Button className='bg-green-300 hover:bg-green-300 md:w-full w-1/2'>
                                    {`It's good`}
                                </Button>
                                <Button className='bg-red-300 hover:bg-red-300 md:w-full w-1/2'>
                                    {`It's not good`}
                                </Button>
                            </div>
                        </div>}
                        <div className='w-full lg:w-4/5 py-2 px-4 bg-white flex items-center gap-2 rounded-b-lg'>
                            {review && <Image src={review?.User?.photo} alt='pfp' className='h-[60px] w-[60px] border-2 border-green-400 rounded-full mb-auto' height={1000} width={1000} />}
                            <div>
                                <div className='font-semibold flex items-center gap-2'>
                                    <p className='text-[13px]'>{review?.User?.username}</p>
                                    {review && <p className='text-[12px] text-slate-400'>{timeAgo(review?.createdAt.toString())}</p>}
                                </div>
                                <div className='bg-slate-200 p-1 rounded-r-lg rounded-bl-lg'>
                                    <p className='text-[13px]'>{review?.Request?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`rounded-t-lg flex flex-col md:h-[${height}px] h-full md:flex-row justify-center items-center my-3 w-full lg:w-4/5`}>
                            {review?.Request?.platform === 'TikTok' &&
                                <div className={`rounded-lg h-full w-full md:w-[400px] bg-white md:mt-5 flex-col flex justify-center items-center border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-3'>
                                        {review && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={review?.User?.photo} alt='pfp' height={500} width={500} />}
                                        <p className='ml-2 mr-auto'>{review?.User?.username}</p>
                                    </div>
                                    {review &&
                                        <div className={`rounded-lg h-[${height - 200}px] flex justify-center items-center w-full mt-7`}>
                                            <TikTokEmbed url={review?.Request?.postLink} width={350} />
                                        </div>}
                                </div>}


                            {review?.Request?.platform === 'Instagram' &&
                                <ScrollArea className={`rounded-lg h-full w-full md:w-[400px] bg-white md:mt-5 flex-col flex justify-center items-center border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-3'>
                                        {review && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={review?.User?.photo} alt='pfp' height={500} width={500} />}
                                        <p className='ml-2 mr-auto'>{review?.User?.username}</p>
                                    </div>
                                    {review &&
                                        <div className='rounded-lg h-[700px] flex justify-center items-center w-full'>
                                            <InstagramEmbed url={review?.Request?.postLink} width={350} />
                                        </div>}
                                </ScrollArea>}


                            {review?.Request?.platform === 'Youtube' &&
                                <div className={`rounded-lg h-full w-full md:w-[400px] bg-white md:mt-5 flex-col flex justify-center items-center border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-2'>
                                        {review && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={review?.User?.photo} alt='pfp' height={500} width={500} />}
                                        <div className='flex flex-col mr-auto ml-2'>
                                            <p className='mr-auto'>{review?.User?.username}</p>
                                        </div>
                                    </div>
                                    {review &&
                                        <div className={`rounded-lg h-[${height - 200}px] flex justify-center items-center w-full mt-7`}>
                                            <YouTubeEmbed url={review?.Request?.postLink} width={350} height={height - 200} />
                                        </div>}
                                </div>}


                            <ScrollArea className={`w-full md:w-[400px] md:h-[0px] h-full bg-white rounded-lg flex-col flex justify-center items-center mt-5 md:ml-3 border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray', height: height - 100 }}>
                                <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-3'>
                                    {review && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={review?.Reviewer?.photo} alt='pfp' height={500} width={500} />}
                                    <p className='ml-2 mr-auto'>{review?.Reviewer?.username}</p>
                                </div>
                                {review?.contentNotes &&
                                    <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
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
                                        <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.contentNotes}</p>
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
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.brightnessNotes}</p>
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
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.descriptionNotes}</p>
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
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.hashtagsNotes}</p>
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
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.soundNotes}</p>
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
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.bioNotes}</p>
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
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.highlightsNotes}</p>
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
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.postsNotes}</p>
                                </div>}
                                {review?.additionalNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{review?.additionalNotes}</p>
                                </div>}
                                {review?.reviewURL && <div className={`rounded-lg h-[${height - 200}px] flex justify-center items-center w-full mt-7`}>
                                    {review && <YouTubeEmbed url={review?.reviewURL} width={350} height={height - 200} />}
                                </div>}
                                <div className='w-full flex flex-col justify-center items-center text-center my-6 gap-2'>
                                    {!review?.rated && <RatingDialog id={id} />}
                                    {review?.rated && <Button className='w-1/2 flex justify-center items-center bg-green-700'>Rated</Button>}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                </div>
            </div>}
        </>
    )
}

export default ResponsePage