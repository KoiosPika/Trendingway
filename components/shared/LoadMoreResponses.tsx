'use client'

import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import CancelOrder from './CancelOrder'
import { Button } from '../ui/button'
import CanceledOrderDialog from './CanceledOrderDialog'
import { getPaginatedResponses } from '@/lib/actions/review.actions'
import { IReview } from '@/lib/database/models/review.model'

const LoadMoreResponses = ({ id, userId }: { id: string, userId: string }) => {

  const [reviews, setReviews] = useState<IReview[]>([])
  const [lastOrderId, setLastOrderId] = useState<string>(id)
  const [loading, setLoading] = useState<boolean>(false)

  const getOrders = async () => {
    setLoading(true)
    const requestedResponses = await getPaginatedResponses(userId, lastOrderId);
    setReviews((prevOrders) => [...prevOrders, ...requestedResponses]);
    if (requestedResponses.length > 0) {
      setLastOrderId(requestedResponses[requestedResponses.length - 1]._id)
    }
    setLoading(false)
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-semibold my-4'>
        {reviews.map((review: IReview) => (
          <div key={review?._id} className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
            <div className='flex flex-row items-center gap-2 mr-auto md:ml-2 w-full'>
              <Link href={`/profile/${review?.Reviewer?.username}`}>
                <Image src={review?.Reviewer?.photo} alt='pfp' className='h-[40px] w-[40px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
              </Link>
              <div>
                <p className='text-[13px]'>{review?.Reviewer?.username}</p>
                <p className='text-[12px] text-slate-400'>{timeAgo(review?.createdAt.toString())}</p>
              </div>
              {review?.Request?.type === 'TextReview' && <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {review?.Request?.type === 'LongTextReview' && <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {review?.Request?.type === 'VideoReview' && <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {review?.Request?.type === 'LongVideoReview' && <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#B69615] w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {review?.Request?.type === 'TextProfileReview' && <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
              {review?.Request?.type === 'VideoProfileReview' && <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
            </div>
            <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'>{review?.Request?.description}</p>
            <Link href={`/notifications/responses/${review?.Request?._id}`} className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2'>
              <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
              <p className='text-[13px] md:text-[16px]'>Go to Review</p>
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