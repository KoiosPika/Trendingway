'use client'

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import Image from 'next/image';
import { IMessage } from '@/lib/database/models/message.model';
import { getMessagesByRequestID, getMoreMessages } from '@/lib/actions/message.actions';
import { getChatByRequestID } from '@/lib/actions/chat.actions';
import { useRouter } from 'next/navigation';
import { createPersonalInsight } from '@/lib/actions/insight.actions';
import Link from 'next/link';
import { useSession } from '@clerk/nextjs';
import { getSessionByUserID } from '@/lib/actions/session.actions';

const PersonalInsightPage = ({ id, userId, user }: { id: string, userId: string, user: string }) => {

    const [messages, setMessages] = useState<IMessage[]>([])
    const [height, setHeight] = useState<number>(window.innerHeight)
    const [chat, setChat] = useState<any>()
    const [text, setText] = useState<string>('')
    const [status, setStatus] = useState<'Ready' | 'Loading' | 'Error' | 'Success'>('Ready')
    const [chatLoading, setChatLoading] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(true)
    const [renderPage, setRenderPage] = useState<boolean>(false)
    const router = useRouter();

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

        getChat()
        getMessages();
    }, [])

    const submitPersonalInsight = async () => {

        setStatus('Loading')

        const insight = {
            request: id,
            text,
            Insighter: userId,
            User: user
        }
        const response = await createPersonalInsight(insight)

        if (!response) {
            setStatus('Error')
        } else {
            setStatus('Success')
        }

        setTimeout(() => {
            router.push('/activity/orders');
        }, 1000); 
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
                                            <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                        </div>}
                                    {message.User?._id != userId &&
                                        <div className='p-3 md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                            <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                            {message.type === "text" && <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md font-semibold'>{message.text}</p>}
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
                    {chat && chat.type === 'PersonalInsight' &&
                        <div className='flex flex-row items-center justify-center gap-2 w-full my-2'>
                            <Input onChange={(e) => setText(e.target.value)} placeholder='Your insight' className='w-4/5 border-2 border-black h-[50px] text-[16px]' />
                            {status === 'Ready' && <Image src={'/icons/up.svg'} alt='send' height={40} width={40} className='rotate-90 hover:cursor-pointer' onClick={submitPersonalInsight} />}
                            {status === 'Loading' && <Image src={'/icons/spinner.svg'} alt='send' height={40} width={40} className='rotate-90 animate-spin' />}
                            {status === 'Error' && <Image src={'/icons/exclamation.svg'} alt='send' height={40} width={40} />}
                            {status === 'Success' && <Image src={'/icons/check.svg'} alt='send' height={40} width={40} />}
                        </div>}
                </div>
            </div>}
        </>
    )
}

export default PersonalInsightPage