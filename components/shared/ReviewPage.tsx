'use client'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { getRequestById } from '@/lib/actions/request.actions'
import { IRequest } from '@/lib/database/models/request.model'
import { createReview } from '@/lib/actions/review.actions'


const ReviewPage = ({ id } : { id: string } ) => {

    const [request, setRequest] = useState<IRequest>()

    const [contentNotes, setContentNotes] = useState<string>('')
    const [brightnessNotes, setBrightnessNotes] = useState<string>('')
    const [descriptionNotes, setDescriptionNotes] = useState<string>('')
    const [hashtagsNotes, setHashtagsNotes] = useState<string>('')
    const [soundNotes, setSoundNotes] = useState<string>('')
    const [additionalNotes, setAdditionalNotes] = useState<string>('')

    useEffect(() => {
        async function getRequest() {
            const thisRequest = await getRequestById(id)

            setRequest(thisRequest);
        }

        getRequest()
    }, [])

    const submitReview = async () => {
        const review = {
            request: id,
            contentNotes: contentNotes || '',
            brightnessNotes: brightnessNotes || '',
            descriptionNotes: descriptionNotes || '',
            hashtagsNotes: hashtagsNotes || '',
            soundNotes: soundNotes || '',
            additionalNotes: descriptionNotes || ''
        }
        await createReview(review)
    }

    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col md:max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-t-lg flex h-[750px] md:flex-row justify-center items-center mt-3 p-3 w-full lg:w-4/5'>
                        <div className='rounded-lg h-[750px] w-[360px]'>
                            {request && <TikTokEmbed url={request?.postLink} width={350} />}
                        </div>
                        <ScrollArea className='hidden md:block w-[400px] h-[750px] bg-white rounded-tr-lg rounded-br-lg flex-col items-center'>
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
                    </div>
                    <div className='w-4/5 py-2 px-4 bg-white flex items-center gap-2 rounded-b-lg'>
                        {request && <Image src={request?.User?.photo} alt='pfp' className='h-[60px] w-[60px] border-2 border-green-400 rounded-full mb-auto' height={1000} width={1000} />}
                        <div>
                            <div className='font-semibold flex items-center gap-2'>
                                <p className='text-[13px]'>{request?.User?.username}</p>
                                <p className='text-[12px] text-slate-400'>2h ago</p>
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
                            <DrawerHeader>
                                <DrawerTitle>Review</DrawerTitle>
                            </DrawerHeader>
                            <ScrollArea className='flex flex-1'>
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
                                    <Input placeholder='Notes about content' className='w-4/5 border-2 border-black text-[16px]' />
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
                                    <Input placeholder='Notes about brightness:' className='w-4/5 border-2 border-black' />
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
                                    <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
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
                                    <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
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
                                    <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
                                </div>
                                <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                    <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                                    <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
                                </div>
                                <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                                    <div className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md'>
                                        <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                                        <p className='py-1 rounded-md font-semibold'>Submit</p>
                                    </div>
                                </div>
                            </ScrollArea>
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