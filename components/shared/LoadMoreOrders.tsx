'use client'

import { getPaginatedOrders } from '@/lib/actions/request.actions'
import { IRequest } from '@/lib/database/models/request.model'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import CancelOrder from './CancelOrder'

const LoadMoreOrders = ({ id, userId }: { id: string, userId: string }) => {

    const [orders, setOrders] = useState<IRequest[]>([])
    const [lastOrderId, setLastOrderId] = useState<string>(id)
    const [loading, setLoading] = useState<boolean>(false)

    const getOrders = async () => {
        setLoading(true)
        const requestedOrders = await getPaginatedOrders(userId, lastOrderId);
        setOrders((prevOrders) => [...prevOrders, ...requestedOrders]);
        if (requestedOrders.length > 0) {
            setLastOrderId(requestedOrders[requestedOrders.length - 1]._id)
        }
        setLoading(false)
    }

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-semibold my-4'>
                {orders && orders.map((request: IRequest) => (
                    <div key={request._id} className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                        <div className='flex flex-row items-center gap-2 mr-auto md:ml-2 w-full'>
                            <Image src={request.User.photo} alt='pfp' className='h-[40px] w-[40px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
                            <div>
                                <p className='text-[13px]'>{request.User.username}</p>
                                <p className='text-[12px] text-slate-400'>{timeAgo(request.createdAt.toString())}</p>
                            </div>
                            {request.type === 'VideoInsight' && <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                            {request.type === 'LongVideoInsight' && <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                            {request.type === 'ProfileInsight' && <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                            {request.type === 'PersonalInsight' && <Image src={'/icons/question.svg'} alt='video' width={200} height={200} className='bg-pink-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                            {request.type === 'RandomInsight' && <Image src={'/icons/gavel.svg'} alt='video' width={200} height={200} className='bg-[#3b711e] w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                            {request.type === 'LongRandomInsight' && <Image src={'/icons/feather.svg'} alt='video' width={200} height={200} className='bg-[#3e2ea3] w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                        </div>
                        <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'>{request.description}</p>
                        {(request.type != 'PersonalInsight') &&
                            <Link href={`/insight/${request._id}`} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
                                <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                                <p className='text-[13px] md:text-[16px]'>Start Insight</p>
                            </Link>}
                        {(request.type === 'PersonalInsight') &&
                            <Link href={`/personal-insight/${request._id}`} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
                                <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                                <p className='text-[13px] md:text-[16px]'>Start Insight</p>
                            </Link>}
                        <CancelOrder request={request} />
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center my-3'>
                <p className='bg-yellow-400 font-bold px-2 py-1 rounded-md inline-flex hover:cursor-pointer' onClick={getOrders}>{loading ? 'Loading...' : 'Load More'}</p>
            </div>
        </>
    )
}

export default LoadMoreOrders