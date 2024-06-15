'use client'

import React, { useEffect, useState } from 'react'
import { getInsightByRequestId } from '@/lib/actions/insight.actions'
import { IInsight } from '@/lib/database/models/insight.model';
import { InstagramEmbed, TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import RatingDialog from './RatingDialog';
import { Button } from '../ui/button';
import { timeAgo } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getPlaybackId } from '@/lib/actions/mux.actions';
import MuxPlayer from '@mux/mux-player-react';

const ResponsePage = ({ id, userId }: { id: string, userId: string }) => {

    const [insight, setInsight] = useState<IInsight>()
    const [height, setHeight] = useState(0)
    const [renderPage, setRenderPage] = useState<boolean>(false)
    const [playbackId, setPlaybackId] = useState<string>('')
    const router = useRouter();

    useEffect(() => {
        if (insight) {
            if (insight?.Request.platform === 'TikTok') {
                setHeight(950)
            } else if (insight?.Request.platform === 'Instagram') {
                setHeight(750)
            } else if (insight?.Request.platform === 'Youtube') {
                setHeight(900);
            }
        }
    }, [insight])

    useEffect(() => {
        async function getInsight() {
            const thisInsight = await getInsightByRequestId(id);

            if (thisInsight?.User?._id != userId) {
                router.push('/profile')
            } else {
                if (thisInsight.insightID) {
                    const thisPlaybackId = await getPlaybackId(thisInsight.insightID)
                    setPlaybackId(thisPlaybackId as string)
                }
                setRenderPage(true);
            }

            setInsight(thisInsight)
        }

        getInsight()
    }, [])


    return (
        <>
            {renderPage && <div className='w-full flex justify-center items-center bg-white h-full'>
                <div className='w-full flex flex-col md:max-w-[1000px] justify-center items-center'>
                    <div className='my-3 justify-center items-center flex flex-col w-full'>
                        <div className='w-full lg:w-4/5 py-2 px-4 bg-white flex items-center gap-2 rounded-b-lg'>
                            {insight && <Image src={insight?.User?.photo} alt='pfp' className='h-[60px] w-[60px] border-2 border-green-400 rounded-full mb-auto' height={1000} width={1000} />}
                            <div>
                                <div className='font-semibold flex items-center gap-2'>
                                    <p className='text-[13px]'>{insight?.User?.username}</p>
                                    {insight && <p className='text-[12px] text-slate-400'>{timeAgo(insight?.createdAt.toString())}</p>}
                                </div>
                                <div className='bg-slate-200 p-1 rounded-r-lg rounded-bl-lg'>
                                    <p className='text-[13px]'>{insight?.Request?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`rounded-t-lg flex flex-col md:h-[${height}px] h-full md:flex-row justify-center items-center my-3 w-full lg:w-4/5`}>
                            {insight?.Request?.platform === 'TikTok' &&
                                <div className={`rounded-lg h-full w-full md:w-[400px] bg-white md:mt-5 flex-col flex justify-center items-center border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-3'>
                                        {insight && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={insight?.User?.photo} alt='pfp' height={500} width={500} />}
                                        <p className='ml-2 mr-auto'>{insight?.User?.username}</p>
                                    </div>
                                    {insight &&
                                        <div className={`rounded-lg h-[${height - 200}px] flex justify-center items-center w-full mt-7`}>
                                            <TikTokEmbed url={insight?.Request?.postLink} width={350} />
                                        </div>}
                                </div>}


                            {insight?.Request?.platform === 'Instagram' &&
                                <ScrollArea className={`rounded-lg h-full w-full md:w-[400px] bg-white md:mt-5 flex-col flex justify-center items-center border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' , height}}>
                                    <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-3'>
                                        {insight && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={insight?.User?.photo} alt='pfp' height={500} width={500} />}
                                        <p className='ml-2 mr-auto'>{insight?.User?.username}</p>
                                    </div>
                                    {insight &&
                                        <div className='rounded-lg h-[700px] flex justify-center items-center w-full'>
                                            <InstagramEmbed url={insight?.Request?.postLink} width={350} />
                                        </div>}
                                </ScrollArea>}


                            {insight?.Request?.platform === 'Youtube' &&
                                <div className={`rounded-lg h-full w-full md:w-[400px] bg-white md:mt-5 flex-col flex justify-center items-center border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray', height }}>
                                    <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-2'>
                                        {insight && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={insight?.User?.photo} alt='pfp' height={500} width={500} />}
                                        <div className='flex flex-col mr-auto ml-2'>
                                            <p className='mr-auto'>{insight?.User?.username}</p>
                                        </div>
                                    </div>
                                    {insight &&
                                        <div className={`rounded-lg h-[${height - 200}px] flex justify-center items-center w-full mt-7`}>
                                            <YouTubeEmbed url={insight?.Request?.postLink} width={350} height={height - 200} />
                                        </div>}
                                </div>}


                            <ScrollArea className={`w-full md:w-[400px] md:h-[0px] h-full bg-white rounded-lg flex-col flex justify-center items-center mt-5 md:ml-3 border-[2px] border-slate-300`} style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray', height: height }}>
                                <div className='mt-2 font-semibold text-center w-full flex justify-center items-center mb-3'>
                                    {insight && <Image className='w-[50px] h-[50px] rounded-full ml-3 border-2 border-green-400' src={insight?.Insighter?.photo} alt='pfp' height={500} width={500} />}
                                    <p className='ml-2 mr-auto'>{insight?.Insighter?.username}</p>
                                </div>
                                {insight?.contentNotes &&
                                    <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                        <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Content</p>
                                        <div className='flex flex-row justify-around my-3'>
                                            <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                            <div className='flex flex-row items-center w-full justify-center gap-2'>
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <Image
                                                        key={index}
                                                        className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                        src={index < insight?.contentRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                        alt='star'
                                                        width={100}
                                                        height={100}
                                                    />
                                                ))}
                                            </div>

                                        </div>
                                        <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.contentNotes}</p>
                                    </div>}
                                {insight?.brightnessNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Brightness</p>
                                    <div className='flex flex-row justify-around  my-3'>
                                        <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                        <div className='flex flex-row items-center w-full justify-center gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                    src={index < insight?.brightnessRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.brightnessNotes}</p>
                                </div>}
                                {insight?.descriptionNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Title & Description</p>
                                    <div className='flex flex-row justify-around my-3'>
                                        <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                        <div className='flex flex-row items-center w-full justify-center gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                    src={index < insight?.descriptionRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.descriptionNotes}</p>
                                </div>}
                                {insight?.hashtagsNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Hashtags</p>
                                    <div className='flex flex-row justify-around my-3'>
                                        <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                        <div className='flex flex-row items-center w-full justify-center gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                    src={index < insight?.hashtagsRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.hashtagsNotes}</p>
                                </div>}
                                {insight?.soundNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Sound</p>
                                    <div className='flex flex-row justify-around my-3'>
                                        <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                        <div className='flex flex-row items-center w-full justify-center gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                    src={index < insight?.soundRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.soundNotes}</p>
                                </div>}
                                {insight?.bioNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Bio</p>
                                    <div className='flex flex-row justify-around my-3'>
                                        <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                        <div className='flex flex-row items-center w-full justify-center gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                    src={index < insight?.bioRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.bioNotes}</p>
                                </div>}
                                {insight?.highlightsNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Highlights</p>
                                    <div className='flex flex-row justify-around  my-3'>
                                        <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                        <div className='flex flex-row items-center w-full justify-center gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                    src={index < insight?.highlightsRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.highlightsNotes}</p>
                                </div>}
                                {insight?.postsNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Posts</p>
                                    <div className='flex flex-row justify-around my-3'>
                                        <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                        <div className='flex flex-row items-center w-full justify-center gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                                                    src={index < insight?.postsRate ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.postsNotes}</p>
                                </div>}
                                {insight?.additionalNotes && <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                                    <p className='w-4/5 bg-slate-200 p-1.5 rounded-lg text-[16px] font-semibold'>{insight?.additionalNotes}</p>
                                </div>}
                                {insight?.insightID && <div className={`rounded-lg h-[${height - 200}px] flex justify-center items-center w-full mt-7`}>
                                    {insight &&
                                        <MuxPlayer
                                            playbackId={playbackId}
                                            streamType="on-demand"
                                        />
                                    }
                                </div>}
                                <div className='w-full flex flex-col justify-center items-center text-center my-6 gap-2'>
                                    {!insight?.rated && <RatingDialog id={id} />}
                                    {insight?.rated && <Button className='w-1/2 flex justify-center items-center bg-green-700'>Rated</Button>}
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