'use client'

import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { getPaginatedResponses } from '@/lib/actions/insight.actions'
import { IInsight } from '@/lib/database/models/insight.model'

const LoadMoreResponses = ({ id, userId }: { id: string, userId: string }) => {

  const [insights, setInsights] = useState<IInsight[]>([])
  const [lastOrderId, setLastOrderId] = useState<string>(id)
  const [loading, setLoading] = useState<boolean>(false)

  const getOrders = async () => {
    setLoading(true)
    const requestedResponses = await getPaginatedResponses(userId, lastOrderId);
    setInsights((prevOrders) => [...prevOrders, ...requestedResponses]);
    if (requestedResponses.length > 0) {
      setLastOrderId(requestedResponses[requestedResponses.length - 1]._id)
    }
    setLoading(false)
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-semibold my-4'>
        {insights.map((insight: IInsight) => (
          <div key={insight?._id} className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
            <div className='flex flex-row items-center gap-2 mr-auto md:ml-2 w-full'>
              <Link href={`/profile/${insight?.Insighter?.username}`}>
                <Image src={insight?.Insighter?.photo} alt='pfp' className='h-[40px] w-[40px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
              </Link>
              <div>
                <p className='text-[13px]'>{insight?.Insighter?.username}</p>
                <p className='text-[12px] text-slate-400'>{timeAgo(insight?.createdAt.toString())}</p>
              </div>
              {insight?.Request?.type === 'TextInsight' && <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {insight?.Request?.type === 'LongTextInsight' && <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {insight?.Request?.type === 'VideoInsight' && <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {insight?.Request?.type === 'LongVideoInsight' && <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#B69615] w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {insight?.Request?.type === 'TextProfileInsight' && <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {insight?.Request?.type === 'VideoProfileInsight' && <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
            </div>
            <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'>{insight?.Request?.description}</p>
            <Link href={`/notifications/responses/${insight?.Request?._id}`} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
              <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
              <p className='text-[13px] md:text-[16px]'>Go to Insight</p>
            </Link>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center my-3'>
        <p className='bg-yellow-400 font-bold px-2 py-1 rounded-md inline-flex hover:cursor-pointer' onClick={getOrders}>{loading ? 'Loading...' : 'Load More'}</p>
      </div>
    </>
  )
}

export default LoadMoreResponses