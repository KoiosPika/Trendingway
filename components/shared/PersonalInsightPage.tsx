'use client'

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import Image from 'next/image';
import { IMessage } from '@/lib/database/models/message.model';
import { getMessagesByRequestID } from '@/lib/actions/message.actions';
import { getChatByRequestID } from '@/lib/actions/chat.actions';
import { IChat } from '@/lib/database/models/chat.model';

const PersonalInsightPage = ({ id, userId }: { id: string, userId: string }) => {

    const [messages, setMessages] = useState<IMessage[]>([])
    const [height, setHeight] = useState<number>(window.innerHeight)
    const [chat, setChat] = useState<IChat>()

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

        async function getChat(){
            const thisChat = await getChatByRequestID(id)
            setChat(thisChat)
        }

        getChat()
        getMessages();
    }, [])
    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col md:max-w-[1000px] h-full'>
                <div className='w-full flex justify-center items-center bg-slate-100 py-2 gap-2'>
                    {chat && <Image src={chat.User1._id == userId ? chat.User2.photo :chat.User1.photo} alt='pfp' height={50} width={50} className='rounded-full'/>}
                    {chat && <p className='font-semibold'>{chat.User1._id == userId ? chat.User2.username :chat.User1.username}</p>}
                </div>
                <ScrollArea className='w-full overflow-auto flex' style={{ height: height - 300 }}>
                    <div className="flex flex-col-reverse w-full p-3 mt-auto" style={{ minHeight: height - 300 }}>
                        {messages && messages.map((message: IMessage, index) => (
                            <div key={index} className='w-full'>
                                {message.User?._id == userId && <div className='p-3 ml-auto md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                    <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md'>{message.text}</p>
                                    <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                </div>}
                                {message.User?._id != userId && <div className='p-3 rounded w-2/4 flex flex-row items-center gap-2'>
                                    <Image src={message.User?.photo} alt='pfp' height={40} width={40} />
                                    <p>{message.text}</p>
                                </div>}
                                {message.User?._id == userId && <div className='p-3 ml-auto md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                    <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md'>{message.text}</p>
                                    <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                </div>}
                                {message.User?._id != userId && <div className='p-3 rounded w-2/4 flex flex-row items-center gap-2'>
                                    <Image src={message.User?.photo} alt='pfp' height={40} width={40} />
                                    <p>{message.text}</p>
                                </div>}
                                {message.User?._id == userId && <div className='p-3 ml-auto md:w-2/4 w-3/4 flex flex-row items-center gap-2'>
                                    <p className='md:text-[15px] text-[13px] bg-slate-200 p-2 rounded-md'>{message.text}</p>
                                    <Image src={message.User?.photo} alt='pfp' height={40} width={40} className='mt-auto rounded-full' />
                                </div>}
                                {message.User?._id != userId && <div className='p-3 rounded w-2/4 flex flex-row items-center gap-2'>
                                    <Image src={message.User?.photo} alt='pfp' height={40} width={40} />
                                    <p>{message.text}</p>
                                </div>}
                                
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className='flex flex-row items-center justify-center gap-2 w-full my-2'>
                    <Input className='w-4/5 border-2 border-black' />
                    <Image src={'/icons/up.svg'} alt='send' height={40} width={40} className='rotate-90' />
                </div>
            </div>
        </div>
    )
}

export default PersonalInsightPage