'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { InstagramEmbed, TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed';
import { getRequestById } from '@/lib/actions/request.actions'
import { IRequest } from '@/lib/database/models/request.model'
import { timeAgo } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import VideoInsightForm from './VideoInsightForm';
import ProfileInsightForm from './ProfileInsightForm';
import RandomInsightForm from './RandomInsightForm';


const InsightPage = ({ id, userId }: { id: string, userId: string }) => {

    const [request, setRequest] = useState<IRequest>()
    const [height, setHeight] = useState(0)
    const [renderPage, setRenderPage] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        async function getRequest() {
            const thisRequest = await getRequestById(id)

            if (thisRequest?.Insighter?._id != userId || thisRequest?.insighted == true) {
                router.push('/profile')
            } else {
                setRenderPage(true);
            }

            setRequest(thisRequest)
        }

        getRequest()
    }, [])

    useEffect(() => {
        if (request) {
            if (request.platform === 'TikTok') {
                setHeight(750)
            } else if (request.platform === 'Instagram') {
                setHeight(650)
            } else if (request.platform === 'Youtube') {
                setHeight(700);
            }
        }
    }, [request])

    return (
        <>
            {renderPage && <div className='w-full flex justify-center items-center bg-white h-full'>
                <div className='w-full flex flex-col md:max-w-[1000px] justify-center items-center'>
                    <div className='my-3 justify-center items-center flex flex-col w-full'>
                        <div className='w-full py-2 px-4 bg-white flex items-center gap-2 rounded-b-lg'>
                            {request && <Image src={request?.User?.photo} alt='pfp' className='h-[60px] w-[60px] border-2 border-green-400 rounded-full mb-auto' height={1000} width={1000} />}
                            <div>
                                <div className='font-semibold flex items-center gap-2'>
                                    <p className='text-[13px]'>{request?.User?.username}</p>
                                    {request && <p className='text-[12px] text-slate-400'>{timeAgo(request?.createdAt.toString())}</p>}
                                </div>
                                <div className='bg-gray-300 p-1 rounded-r-lg rounded-bl-lg'>
                                    <p className='text-[13px]'>{request?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`rounded-t-lg flex flex-col md:flex-row h-full md:h-[${height}px] w-full lg:w-4/5 justify-center items-center`}>
                            {request?.platform === 'TikTok' &&
                                <div className='rounded-lg h-[750px] w-[360px]'>
                                    {request && <TikTokEmbed url={request?.postLink} width={350} />}
                                </div>}
                            {request?.platform === 'Instagram' &&
                                <div className='rounded-lg h-[650px] w-[360px]'>
                                    {request && <InstagramEmbed url={request?.postLink} width={350} />}
                                </div>}
                            {request?.platform === 'Youtube' &&
                                <div className='rounded-lg h-[700px] w-[360px]'>
                                    {request && <YouTubeEmbed url={request?.postLink} width={350} height={height} />}
                                </div>}
                            <div className={`h-full w-full flex justify-center items-center`}>
                                {(request?.type === 'VideoInsight' || request?.type === 'LongVideoInsight') &&
                                    <VideoInsightForm height={height} id={id} insighter={request?.Insighter?._id} user={request?.User?._id} />}
                                {request?.type === 'ProfileInsight' &&
                                    <ProfileInsightForm height={height} id={id} insighter={request?.Insighter?._id} user={request?.User?._id} />}
                                {(request?.type === 'RandomInsight' || request?.type === 'LongRandomInsight') &&
                                    <RandomInsightForm height={height} id={id} insighter={request?.Insighter?._id} user={request?.User?._id} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default InsightPage