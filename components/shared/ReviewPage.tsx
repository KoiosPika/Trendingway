'use client'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { InstagramEmbed, TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { getRequestById } from '@/lib/actions/request.actions'
import { IRequest } from '@/lib/database/models/request.model'
import TextReviewForm from './TextReviewForm'
import VideoReviewForm from './VideoReviewForm'
import TextProfileReviewForm from './TextProfileReviewForm'
import VideoProfileReviewForm from './VideoProfileReviewForm'
import { timeAgo } from '@/lib/utils'


const ReviewPage = ({ id }: { id: string }) => {

    const [request, setRequest] = useState<IRequest>()
    const [height, setHeight] = useState(0)

    useEffect(() => {
        async function getRequest() {
            const thisRequest = await getRequestById(id)

            setRequest(thisRequest)
        }

        getRequest()
    }, [])

    useEffect(() => {
        if (request) {
            if (request.platform === 'TikTok') {
                setHeight(750)
            } else if (request.platform === 'Instagram') {
                setHeight(600)
            } else if (request.platform === 'Youtube') {
                setHeight(700);
            }
        }
    }, [request])

    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col md:max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-t-lg flex h-[750px] md:flex-row justify-center items-center mt-3 p-3 w-full lg:w-4/5'>
                        {request?.platform === 'TikTok' &&
                            <div className='rounded-lg h-[750px] w-[360px]'>
                                {request && <TikTokEmbed url={request?.postLink} width={350} />}
                            </div>}
                        {request?.platform === 'Instagram' &&
                            <div className='rounded-lg h-[600px] w-[360px]'>
                                {request && <InstagramEmbed url={request?.postLink} width={350} />}
                            </div>}
                        {request?.platform === 'Youtube' &&
                            <div className='rounded-lg h-[700px] w-[360px]'>
                                {request && <YouTubeEmbed url={request?.postLink} width={350} height={height} />}
                            </div>}
                        <div className={`hidden md:block h-[${height}px]`}>
                            {request?.type === 'TextReview' &&
                                <TextReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                            {request?.type === 'VideoReview' &&
                                <VideoReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                            {request?.type === 'TextProfileReview' &&
                                <TextProfileReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                            {request?.type === 'VideoProfileReview' &&
                                <VideoProfileReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                        </div>
                    </div>
                    <div className='w-4/5 py-2 px-4 bg-white flex items-center gap-2 rounded-b-lg'>
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
                    <Drawer>
                        <DrawerTrigger className="w-full flex justify-center items-center">
                            <div className='w-3/5 bg-yellow-400 text-center font-semibold py-3 rounded-lg md:hidden'>
                                Review
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="h-5/6">
                            <div className='h-full flex'>
                                {request?.type === 'TextReview' &&
                                    <TextReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                                {request?.type === 'VideoReview' &&
                                    <VideoReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                                {request?.type === 'TextProfileReview' &&
                                    <TextProfileReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                                {request?.type === 'VideoProfileReview' &&
                                    <VideoProfileReviewForm height={height} id={id} reviewer={request?.Reviewer?._id} user={request?.User?._id} />}
                            </div>
                            <DrawerFooter>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </div>
    )
}

export default ReviewPage