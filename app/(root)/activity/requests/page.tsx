import CanceledOrderDialog from '@/components/shared/CanceledOrderDialog'
import DetailsDialog from '@/components/shared/DetailsDialog'
import LoadMoreRequests from '@/components/shared/LoadMoreRequests'
import { Button } from '@/components/ui/button'
import { getAllRequests } from '@/lib/actions/request.actions'
import { IRequest } from '@/lib/database/models/request.model'
import { timeAgo } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const requests = await getAllRequests(userId)

  return (
    <div className='w-full flex justify-center bg-white h-full'>
      <div className='w-full flex flex-col max-w-[1200px] justify-center items-center'>
        <div className='my-3 justify-center items-center flex flex-col w-full rounded-lg mb-auto'>
          <div className='w-11/12 p-2 md:p-8 my-3 rounded-lg bg-white text-black'>
          <DetailsDialog page='Requests' />
            <div className='flex flex-row justify-around items-center my-3 font-bold w-full'>
              <Link href={'/activity/orders'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full'>
                <Image src={'/icons/up.svg'} alt='up' height={20} width={20} />
                <p className='text-[12px] md:text-[15px]'>Orders</p>
              </Link>
              <Link href={'/activity/responses'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full border-t-2 border-[#258FC7] text-[#258FC7]'>
                <Image src={'/icons/hourglass-blue.svg'} alt='up' height={15} width={15} className='rotate-180' />
                <p className='text-[12px] md:text-[15px]'>Requests</p>
              </Link>
              <Link href={'/activity/insights'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full rounded-r-lg'>
                <Image src={'/icons/star-black.svg'} alt='up' height={20} width={20} />
                <p className='text-[12px] md:text-[15px]'>Insights</p>
              </Link>
              <Link href={'/activity/history'} className='flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 text-center w-full rounded-r-lg'>
                <Image src={'/icons/clock-black.svg'} alt='up' height={20} width={20} />
                <p className='text-[12px] md:text-[15px]'>History</p>
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-semibold'>
              {requests.map((request: IRequest) => (
                <div key={request._id} className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg border-[0.5px] border-gray-400' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                  <div className='flex flex-row items-center gap-2 mr-auto md:ml-2 w-full'>
                    <Image src={request.User.photo} alt='pfp' className='h-[40px] w-[40px] border-2 border-green-400 rounded-full' height={1000} width={1000} />
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
                    {request.type === 'TextPersonalInsight' && <Image src={'/icons/people.svg'} alt='video' width={200} height={200} className='bg-pink-500 w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                    {request.type === 'VideoPersonalInsight' && <Image src={'/icons/selfie.svg'} alt='video' width={200} height={200} className='bg-[#b83c4c] w-[40px] h-[40px] p-1.5 rounded-full ml-auto' />}
                  </div>
                  <p className='ml-3 mt-2 mr-auto text-[12.5px] h-[50px] overflow-hidden'>{request.description}</p>
                  {request.status === 'Awaiting' && <Button className='bg-yellow-400 w-full flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2 hover:cursor-default hover:bg-yellow-400'>
                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                    <p className='text-[13px] md:text-[16px] text-black font-bold'>Awaiting Insight</p>
                  </Button>}
                  {request.status === 'Canceled' && <CanceledOrderDialog request={request} />}
                </div>
              ))}
            </div>
            {requests.length > 0 && <LoadMoreRequests userId={userId} id={requests[requests.length - 1]._id} />}
          </div>
        </div>
        {requests.length == 0 &&
          <div className='w-full h-[250px] md:h-full bg-white flex justify-center items-center gap-3'>
            <Image src={'/icons/hourglass.svg'} alt='up' height={25} width={25} />
            <p className='text-[22px] font-bold'>No Requests</p>
          </div>
        }
      </div>
    </div>
  )
}

export default page