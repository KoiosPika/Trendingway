import LoadMoreHistory from '@/components/shared/LoadMoreHistory'
import { Button } from '@/components/ui/button'
import { getAllHistory } from '@/lib/actions/request.actions'
import { IRequest } from '@/lib/database/models/request.model'
import { timeAgo } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const history = await getAllHistory(userId)

    return (
        <div className='w-full flex justify-center bg-white h-full'>
            <div className='w-full flex flex-col max-w-[1200px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full rounded-lg mb-auto'>
                    <div className='w-11/12 p-2 md:p-8 my-3 rounded-lg bg-white text-black'>
                        <div className='flex flex-row justify-around items-center my-3 font-bold'>
                            <Link href={'/notifications/orders'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full'>
                                <Image src={'/icons/up.svg'} alt='up' height={20} width={20} />
                                <p className='text-[12px] md:text-[15px]'>Orders</p>
                            </Link>
                            <Link href={'/notifications/requests'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full'>
                                <Image src={'/icons/hourglass.svg'} alt='up' height={15} width={15} className='rotate-180' />
                                <p className='text-[12px] md:text-[15px]'>Requests</p>
                            </Link>
                            <Link href={'/notifications/responses'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full'>
                                <Image src={'/icons/up.svg'} alt='up' height={20} width={20} className='rotate-180' />
                                <p className='text-[12px] md:text-[15px]'>Responses</p>
                            </Link>
                            <Link href={'/notifications/history'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full border-t-2 border-[#258FC7] text-[#258FC7]'>
                                <Image src={'/icons/clock-blue.svg'} alt='up' height={20} width={20} />
                                <p className='text-[12px] md:text-[15px]'>History</p>
                            </Link>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-semibold'>
                            {history.map((request: IRequest) => (
                                <div key={request._id} className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-row items-center gap-2 mr-auto md:ml-2 w-full'>
                                        <Link href={`/profile/${request.User.username}`}>
                                            <Image src={request.User.photo} alt='pfp' className='h-[40px] w-[40px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
                                        </Link>
                                        <div>
                                            <p className='text-[13px]'>{request.User.username}</p>
                                            <p className='text-[12px] text-slate-400'>{timeAgo(request.createdAt.toString())}</p>
                                        </div>
                                        {request.type === 'TextInsight' && <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                                        {request.type === 'LongTextInsight' && <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                                        {request.type === 'VideoInsight' && <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                                        {request.type === 'LongVideoInsight' && <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#B69615] w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                                        {request.type === 'TextProfileInsight' && <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                                        {request.type === 'VideoProfileInsight' && <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                                    </div>
                                    <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'>{request.description}</p>
                                    {request.status === 'Awaiting' && <Button className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2 hover:cursor-default hover:bg-yellow-400'>
                                        <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                                        <p className='text-[13px] md:text-[16px] text-black font-bold'>Awaiting Insight</p>
                                    </Button>}
                                    {request.status === 'Canceled' && <Button className='bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2 hover:cursor-default hover:bg-red-500'>
                                        <p className='text-[13px] md:text-[16px] text-white font-bold'>X Order Canceled</p>
                                    </Button>}
                                    {request.status === 'Completed' &&
                                        <Button className='bg-green-700 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2 hover:cursor-default hover:bg-green-700'>
                                            <Image src={'/icons/star-white.svg'} alt='star' height={15} width={15} />
                                            <p className='text-[13px] md:text-[16px] text-white font-bold'>Completed</p>
                                        </Button>}
                                </div>
                            ))}
                        </div>
                        {history.length > 0 && <LoadMoreHistory userId={userId} id={history[history.length - 1]._id} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page