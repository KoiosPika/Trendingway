'use client'

import { getAllOrders, getOrdersData, getPaginatedOrders } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import RechargeDialog from './RechargeDialog'

interface IOrdersData {
    month: string
    total: number
    orderCount: number
}

const RechargeOrders = ({ userId }: { userId: string }) => {

    const [orders, setOrders] = useState<IOrder[]>()
    const [ordersData, setOrdersData] = useState<IOrdersData[]>([]);
    const [year, setYear] = useState<number>(2024);

    useEffect(() => {
        async function getOrders() {
            const requestedOrders = await getAllOrders(userId)
            setOrders(requestedOrders);
        }

        getOrders()
    }, [])

    useEffect(() => {

        async function getData() {
            const requestedOrders = await getOrdersData(userId, year)
            setOrdersData(requestedOrders)
        }

        getData()
    }, [year])

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[950px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='w-full md:w-11/12 px-2 py-4 md:p-8 my-3 rounded-lg bg-orange-500 text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Recharge Orders</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[12px] lg:text-[15px]'>Month</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'>$ Total</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'># Orders</p>
                                    </div>
                                </div>
                                {ordersData && ordersData.map((data: IOrdersData, index: number) => (
                                    <div key={index} className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[12px] lg:text-[15px]'>{data?.month}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[13px] lg:text-[15px]'>$ {(data?.total).toLocaleString()}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[13px] lg:text-[15px]'>{(data?.orderCount).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-row w-full justify-center items-center mt-4 gap-3'>
                                <Image src={'/icons/up.svg'} alt='arrow' height={30} width={30} style={{ transform: 'rotate(270deg)' }} className='bg-white rounded-full border-[1px] border-white' onClick={() => setYear(year - 1)} />
                                <p className='font-bold'>{year}</p>
                                <Image src={'/icons/up.svg'} alt='arrow' height={30} width={30} className='rotate-90 bg-white rounded-full border-[1px] border-white' onClick={() => setYear(year + 1)} />
                            </div>
                            <div className='flex flex-row gap-2 my-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Orders breakdown</p>
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
                                        <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                        <p className='text-[13px] lg:text-[15px]'>Details</p>
                                    </div>
                                </div>
                                {orders && orders.map((order: IOrder, index: number) => (
                                    <div key={index} className='flex w-full'>
                                        <RechargeDialog order={order} />
                                    </div>
                                ))}
                                {orders && <LoadMoreRecharges userId={userId} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RechargeOrders

const LoadMoreRecharges = ({ userId }: { userId: string }) => {

    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setloading] = useState<boolean>(false)
    const [page, setPage] = useState(1)

    const getOrders = async () => {
        try {
            setloading(true)
            const requestedOrders = await getPaginatedOrders(userId, page * 3)
            setOrders((prevOrders) => [...prevOrders, ...requestedOrders]);
            setloading(false)
            setPage(page + 1);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {orders && orders.map((order: IOrder, index: number) => (
                <div key={index} className='flex w-full'>
                    <RechargeDialog order={order} />
                </div>
            ))}
            {!loading && <div className='flex justify-center items-center mt-3 hover:cursor-pointer' onClick={getOrders}>
                <p className='inline-flex bg-white text-orange-500 font-semibold px-2 py-1 rounded-lg'>Load More</p>
            </div>}
            {loading && <div className='flex justify-center items-center mt-3'>
                <p className='inline-flex bg-white text-orange-500 font-semibold px-2 py-1 rounded-lg'>Loading...</p>
            </div>}
        </>
    );
};