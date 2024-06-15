'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getAllSpendings, getPaginatedSpendings } from '@/lib/actions/spending.actions'
import { ISpending } from '@/lib/database/models/spending.model'
import SpendingDialog from './SpendingDialog'

const SpendingOrders = ({ userId }: { userId: string }) => {

    const [spendings, setSpendings] = useState<ISpending[]>()

    useEffect(() => {
        async function getOrders() {
            const requestedSpendings = await getAllSpendings(userId)
            setSpendings(requestedSpendings);
        }

        getOrders()
    }, [])

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[950px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='w-11/12 p-4 md:p-8 my-3 rounded-lg bg-[#178EA0] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Spendings</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/dollar-black.svg'} alt='dollar' height={11} width={11} />
                                        <p className='text-[12px] lg:text-[15px]'>Amount</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                        <p className='text-[13px] lg:text-[15px]'>When</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/wrench.svg'} alt='dollar' height={14} width={14} />
                                        <p className='text-[13px] lg:text-[15px]'>Service</p>
                                    </div>
                                </div>
                                {spendings && spendings.map((spending: ISpending, index: number) => (
                                    <div key={index} className='flex w-full'>
                                        <SpendingDialog spending={spending} />
                                    </div>
                                ))}
                                {spendings && <LoadMoreSpendings userId={userId} id={spendings[spendings.length - 1]._id} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpendingOrders

const LoadMoreSpendings = ({ userId, id }: { userId: string, id: string }) => {

    const [spendings, setSpendings] = useState<ISpending[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [lastOrderId, setLastOrderId] = useState<string>(id)

    const getOrders = async () => {
        setLoading(true)
        const requestedSpendings = await getPaginatedSpendings(userId, lastOrderId);
        setSpendings((prevOrders) => [...prevOrders, ...requestedSpendings]);
        if (requestedSpendings.length > 0) {
            setLastOrderId(requestedSpendings[requestedSpendings.length - 1]._id)
        }
        setLoading(false)
    }

    return (
        <>
            {spendings && spendings.map((spending: ISpending, index: number) => (
                <div key={index} className='flex w-full'>
                    <SpendingDialog spending={spending} />
                </div>
            ))}
            {!loading && <div className='flex justify-center items-center mt-3 hover:cursor-pointer' onClick={getOrders}>
                <p className='inline-flex bg-white text-[#178EA0] font-semibold px-2 py-1 rounded-lg'>Load More</p>
            </div>}
            {loading && <div className='flex justify-center items-center mt-3'>
                <p className='inline-flex bg-white text-[#178EA0] font-semibold px-2 py-1 rounded-lg'>Loading...</p>
            </div>}
        </>
    );
};