'use client'

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import Image from 'next/image';
import { IMessage } from '@/lib/database/models/message.model';
import { getMessagesByRequestID, getMoreMessages } from '@/lib/actions/message.actions';
import { getChatByRequestID } from '@/lib/actions/chat.actions';
import { getUploadUrl } from '@/lib/actions/mux.actions';
import MuxUploader, { MuxUploaderFileSelect, MuxUploaderProgress } from '@mux/mux-uploader-react';
import { useRouter } from 'next/navigation';
import VideoMessage from './VideoMessage';
import { createTextPersonalInsight } from '@/lib/actions/insight.actions';
import Link from 'next/link';
import { useSession } from '@clerk/nextjs';
import { getSessionByUserID } from '@/lib/actions/session.actions';

const PersonalInsightPage = ({ id, userId, user }: { id: string, userId: string, user: string }) => {

    const [messages, setMessages] = useState<IMessage[]>([])
    const [height, setHeight] = useState<number>(window.innerHeight)
    const [chat, setChat] = useState<any>()
    const [uploadURL, setUploadURL] = useState<string>()
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [chatLoading, setChatLoading] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(true)
    const [renderPage, setRenderPage] = useState<boolean>(false)
    const router = useRouter();
    const {session} = useSession();

    useEffect(() => {
        const checkSession = async () => {
            const currentSession = await getSessionByUserID(userId)

            if(currentSession.sessionId != session?.id){
                router.push('/session-revoked')
            }
        };

        const intervalId = setInterval(checkSession, 500);

        return () => clearInterval(intervalId);
    }, []);

    const updateDimensions = () => {
        setHeight(window.innerHeight);
    }

    const loadMoreChat = async () => {
        if (chatLoading) {
            return;
        }

        setChatLoading(true);

        if (chat && messages.length > 0) {
            const requestedMessages = await getMoreMessages(chat._id, messages[messages.length - 1]._id)
            if (requestedMessages.length > 0) {
                setMessages((prevMessages) => [...prevMessages, ...requestedMessages])
                setChatLoading(false)
            } else {
                setVisible(false)
            }
        }

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
            if (thisChat.User1._id == userId || thisChat.User2._id == userId) {
                setRenderPage(true)
            } else {
                router.push('/profile')
            }
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
        <>
            {renderPage && <div className='w-full flex justify-center items-center bg-white h-full'>
                <div className='w-full flex flex-col md:max-w-[900px] h-full'>
                    <div className='w-full flex justify-center items-center bg-blue-500 md:rounded-lg py-2 gap-2'>
                        {chat && <Image src={chat.User1._id == userId ? chat.User2.photo : chat.User1.photo} alt='pfp' height={50} width={50} className='rounded-full border-[2px] border-white' />}
                        {chat &&
                            <div className='flex flex-col pag-2'>
                                <p className='font-semibold text-white'>{chat.User1._id == userId ? chat.User2.username : chat.User1.username}</p>
                                <Link target='_blank' href={`/profile/${chat.User1._id == userId ? chat.User2.username : chat.User1.username}`} className='flex flex-row items-center gap-1'>
                                    <Image src={'/icons/arrow-up.svg'} alt='link' height={15} width={15} />
                                    <p className='font-semibold text-white underline text-[14px]'>Visit Profile</p>
                                </Link>
                            </div>
                        }
                    </div>
                    <ScrollArea className='w-full overflow-auto flex' style={{ height: height - 205 }}>
                        <div className="flex flex-col-reverse w-full mt-auto" style={{ minHeight: height - 205 }}>
                            {messages && messages.map((message: IMessage, index) => (
                                <div key={index} className='w-full'>
                                    {message.User?._id == userId &&
                                        <div className='p-3 ml-auto md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                            {message.type === "text" && <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md ml-auto font-semibold'>{message.text}</p>}
                                            {message.type === "video" && <VideoMessage videoID={message.videoID} />}
                                            <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                        </div>}
                                    {message.User?._id != userId &&
                                        <div className='p-3 md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                            <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                            {message.type === "text" && <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md font-semibold'>{message.text}</p>}
                                            {message.type === "video" && <VideoMessage videoID={message.videoID} />}
                                        </div>}
                                </div>
                            ))}
                            {visible && <div className='flex w-full justify-center items-center my-2'>
                                {!chatLoading && <div className='border-[1px] border-black md:p-[8px] p-[6px] rounded-full' onClick={loadMoreChat}>
                                    <Image src={'/icons/arrow-rotate.svg'} alt='arrow' height={40} width={40} className='h-[20px] w-[20px] md:h-[30px] md:w-[30px]' />
                                </div>}
                                {chatLoading && <div className='border-[1px] border-black md:p-[8px] p-[6px] rounded-full'>
                                    <Image src={'/icons/spinner.svg'} alt='arrow' height={40} width={40} className='h-[20px] w-[20px] md:h-[30px] md:w-[30px] animate-spin' />
                                </div>}
                            </div>}
                        </div>
                    </ScrollArea>
                    {chat && chat.type === 'TextPersonalInsight' &&
                        <div className='flex flex-row items-center justify-center gap-2 w-full my-2'>
                            <Input onChange={(e) => setText(e.target.value)} placeholder='Your insight' className='w-4/5 border-2 border-black h-[50px] text-[16px]' />
                            {!loading && <Image src={'/icons/up.svg'} alt='send' height={40} width={40} className='rotate-90 hover:cursor-pointer' onClick={submitTextPersonalInsight} />}
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
            </div>}
        </>
    )
}

export default PersonalInsightPage