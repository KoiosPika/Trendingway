'use client'

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import Image from 'next/image';
import { IMessage } from '@/lib/database/models/message.model';
import { getMessagesByRequestID } from '@/lib/actions/message.actions';
import { getChatByRequestID } from '@/lib/actions/chat.actions';
import { getPlaybackId, getUploadUrl } from '@/lib/actions/mux.actions';
import MuxUploader, { MuxUploaderDrop, MuxUploaderFileSelect, MuxUploaderProgress } from '@mux/mux-uploader-react';
import { useRouter } from 'next/navigation';
import VideoMessage from './VideoMessage';
import { createTextPersonalInsight } from '@/lib/actions/insight.actions';

const PersonalInsightPage = ({ id, userId, user }: { id: string, userId: string, user: string }) => {

    const [messages, setMessages] = useState<IMessage[]>([])
    const [height, setHeight] = useState<number>(window.innerHeight)
    const [chat, setChat] = useState<any>()
    const [uploadURL, setUploadURL] = useState<string>()
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const updateDimensions = () => {
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        async function getMessages() {
            const requestedMessages = await getMessagesByRequestID(id)
            setMessages(requestedMessages)
        }

        async function getChat() {
            const thisChat = await getChatByRequestID(id)
            setChat(thisChat)
        }

        async function getURL() {
            const thisURL = await getUploadUrl(id, user, userId, 'VideoPersonalInsight')

            setUploadURL(thisURL)
        }

        getChat()
        getMessages();
        getURL()
    }, [])

    const submitVideoPersonalInsight = (event: any) => {
        router.push('/wallet')
    }

    const submitTextPersonalInsight = async () => {

        if (loading) {
            return;
        }

        setLoading(true)

        const insight = {
            request: id,
            text,
            Insighter: userId,
            User: user
        }
        await createTextPersonalInsight(insight)

        router.push('/wallet')
    }


    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col md:max-w-[1000px] h-full'>
                <div className='w-full flex justify-center items-center bg-slate-100 py-2 gap-2'>
                    {chat && <Image src={chat.User1._id == userId ? chat.User2.photo : chat.User1.photo} alt='pfp' height={50} width={50} className='rounded-full' />}
                    {chat && <p className='font-semibold'>{chat.User1._id == userId ? chat.User2.username : chat.User1.username}</p>}
                </div>
                <ScrollArea className='w-full overflow-auto flex' style={{ height: height - 220 }}>
                    <div className="flex flex-col-reverse w-full mt-auto" style={{ minHeight: height - 220 }}>
                        {messages && messages.map((message: IMessage, index) => (
                            <div key={index} className='w-full'>
                                {message.User?._id == userId &&
                                    <div className='p-3 ml-auto md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                        {message.type === "text" && <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md'>{message.text}</p>}
                                        {message.type === "video" && <VideoMessage videoID={message.videoID} />}
                                        <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                    </div>}
                                {message.User?._id != userId &&
                                    <div className='p-3 md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                        <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                        <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md'>{message.text}</p>
                                    </div>}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                {chat && chat.type === 'TextPersonalInsight' &&
                    <div className='flex flex-row items-center justify-center gap-2 w-full my-2'>
                        <Input onChange={(e) => setText(e.target.value)} placeholder='Your insight' className='w-4/5 border-2 border-black h-[60px] text-[16px]' />
                        {!loading && <Image src={'/icons/up.svg'} alt='send' height={40} width={40} className='rotate-90' onClick={submitTextPersonalInsight} />}
                        {loading && <Image src={'/icons/spinner.svg'} alt='send' height={40} width={40} className='rotate-90 animate-spin' />}
                    </div>}
                {chat && chat.type === 'VideoPersonalInsight' &&
                    <div className='flex flex-col items-center justify-center w-full my-2'>
                        <MuxUploader onChunkSuccess={(event) => submitVideoPersonalInsight(event)} id="my-uploader" className="hidden" endpoint={uploadURL} />
                        <MuxUploaderFileSelect muxUploader="my-uploader" className='w-full flex justify-center items-center'>
                            <button
                                className="bg-yellow-400 hover:bg-yellow-500 my-2 px-4 py-2 rounded text-black font-semibold text-sm"
                            >
                                Upload a video insight
                            </button>
                        </MuxUploaderFileSelect>
                        <MuxUploaderProgress
                            type="bar"
                            muxUploader="my-uploader"
                            className="w-full text-3xl text-orange-600 underline"
                        />
                    </div>}
            </div>
        </div>
    )
}

export default PersonalInsightPage