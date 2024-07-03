'use client'

import { getAllEarnings, getEarningsData, getPaginatedEarnings } from '@/lib/actions/earning.actions'
import { IEarning } from '@/lib/database/models/earning.model'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import EarningDialog from './EarningDialog'

interface IEarningData {
    month: string,
    total: number,
    fee: number,
    orderCount: number
}

interface IYearlyData {
    total: number,
    total_fees: number,
    total_orders: number
}

const EarningOrders = ({ userId }: { userId: string }) => {

    const [earnings, setEarnings] = useState<IEarning[]>()
    const [earningsData, setEarningsData] = useState<IEarningData[]>([]);
    const [yearlyData, setYearlyData] = useState<IYearlyData>();
    const [year, setYear] = useState<number>(2024)

    useEffect(() => {
        async function getOrders() {
            const requestedEarnings = await getAllEarnings(userId)
            setEarnings(requestedEarnings);
        }

        getOrders()
    }, [])

    useEffect(() => {

        async function getData() {
            const requestedOrders = await getEarningsData(userId, year)
            setEarningsData(requestedOrders)
            const totalSum = requestedOrders.reduce((acc: any, curr: any) => acc + curr.total, 0);
            const feeSum = requestedOrders.reduce((acc: any, curr: any) => acc + curr.fee, 0);
            const orderCountSum = requestedOrders.reduce((acc: any, curr: any) => acc + curr.orderCount, 0);

            setYearlyData({
                total: totalSum,
                total_fees: feeSum,
                total_orders: orderCountSum
            })
        }

        getData()
    }, [year])

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='w-full md:w-11/12 px-2 py-4 md:p-8 my-3 rounded-lg bg-[#549E4D] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Earnings Summary</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[12px] lg:text-[15px]'>Month</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'>$ Amount</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'>$ Fees</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'># Orders</p>
                                    </div>
                                </div>
                                {earningsData && earningsData.map((data: IEarningData, index: number) => (
                                    <div key={index} className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[10px] lg:text-[15px]'>{data?.month}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[11px] lg:text-[15px]'>$ {Number((data?.total).toFixed(2)).toLocaleString()}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[11px] lg:text-[15px]'>$ {Number((data?.fee).toFixed(2)).toLocaleString()}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[11px] lg:text-[15px]'>{(data?.orderCount).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex flex-row justify-center items-center p-2 gap-2 bg-black text-white font-bold rounded-lg border-2 border-white'>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[12px] lg:text-[15px]'>Total</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'>$ {(yearlyData?.total)?.toFixed(2)}</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'>$ {(yearlyData?.total_fees)?.toFixed(2)}</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'>{(yearlyData?.total_orders)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row w-full justify-center items-center mt-4 gap-3'>
                                <Image src={'/icons/up.svg'} alt='arrow' height={30} width={30} style={{ transform: 'rotate(270deg)' }} className='bg-white rounded-full border-[1px] border-white hover:cursor-pointer' onClick={() => setYear(year - 1)} />
                                <p className='font-bold'>--- {year} ---</p>
                                <Image src={'/icons/up.svg'} alt='arrow' height={30} width={30} className='rotate-90 bg-white rounded-full border-[1px] border-white hover:cursor-pointer' onClick={() => setYear(year + 1)} />
                            </div>
                            <div className='flex flex-row gap-2 my-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Earnings Breakdown</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <Image src={'/icons/dollar-black.svg'} alt='dollar' height={12} width={12} />
                                        <p className='text-[13px] lg:text-[15px]'>Amount</p>
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
                                {earnings && earnings.map((earning: IEarning, index: number) => (
                                    <div key={index} className='flex w-full'>
                                        <EarningDialog earning={earning} />
                                    </div>
                                ))}
                                {earnings && <LoadMoreEarnings userId={userId} id={earnings[earnings.length - 1]._id} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarningOrders

const LoadMoreEarnings = ({ userId, id }: { userId: string, id: string }) => {

    const [earnings, setEarnings] = useState<IEarning[]>([])
    const [loading, setloading] = useState<boolean>(false)
    const [lastOrderId, setLastOrderId] = useState(id)

    const getOrders = async () => {

        setloading(true)
        const requestedEarnings = await getPaginatedEarnings(userId, lastOrderId)
        setEarnings((prevEarnings) => [...prevEarnings, ...requestedEarnings]);
        if (requestedEarnings.length > 0) {
            setLastOrderId(requestedEarnings[requestedEarnings.length - 1]._id)
        }
        setloading(false)
    }

    return (
        <>
            {earnings && earnings.map((earning: IEarning, index: number) => (
                <div key={index} className='flex w-full'>
                    <EarningDialog earning={earning} />
                </div>
            ))}
            {!loading && <div className='flex justify-center items-center mt-3 hover:cursor-pointer' onClick={getOrders}>
                <p className='inline-flex bg-white text-[#549E4D] font-bold px-2 py-1 rounded-lg text-[13px] md:text-[16px]'>Load More</p>
            </div>}
            {loading && <div className='flex justify-center items-center mt-3'>
                <p className='inline-flex bg-white text-[#549E4D] font-bold px-2 py-1 rounded-lg text-[13px] md:text-[16px]'>Loading...</p>
            </div>}
        </>
    );
};