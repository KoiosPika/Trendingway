'use client'

import { getFlaggedReviews } from '@/lib/actions/review.actions';
import { IReview } from '@/lib/database/models/review.model';
import React, { useEffect, useState } from 'react'
import BackstationFlagedDialog from './BackstationFlagedDialog';

const Backstation = () => {

    const [reviews, setReviews] = useState<IReview[]>()

    const getReviews = async () => {
        const requestedReviews = await getFlaggedReviews();
        setReviews(requestedReviews);
    }

    useEffect(()=>{
        getReviews();
    },[])

    
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <div className='flex w-full flex-row items-center justify-center'>
                <p className='w-1/2 text-center py-2 font-bold'>Reports</p>
                <p className='w-1/2 text-center py-2 font-bold'>Requests</p>
            </div>
            <div className='w-full bg-red-500 py-3 rounded-lg'>
                <div className='grid grid-cols-1 gap-2'>
                    <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold'>
                        <div className='w-full flex flex-row items-center gap-2'>
                            <p className='text-[13px] lg:text-[15px]'>User</p>
                        </div>
                        <div className='w-full flex flex-row items-center gap-2'>
                            <p className='text-[13px] lg:text-[15px]'>When</p>
                        </div>
                        <div className='w-full flex flex-row items-center gap-2'>
                            <p className='text-[13px] lg:text-[15px]'>Price</p>
                        </div>
                        <div className='w-full flex flex-row items-center gap-2'>
                            <p className='text-[13px] lg:text-[15px]'>Service</p>
                        </div>
                    </div>
                </div>
                {reviews && reviews.map((review:IReview,index) => (
                    <div key={index} className='flex flex-row justify-center items-center bg-white text-black'>
                        <BackstationFlagedDialog review={review}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Backstation