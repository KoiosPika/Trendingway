'use client'

import { getAllOrders, getOrdersData, getPaginatedOrders } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import RechargeDialog from './RechargeDialog'
import { getAllTransfers, getPaginatedTransfers, getTransfersData } from '@/lib/actions/transfer.actions'
import { ITransfer } from '@/lib/database/models/transfer.model'
import TransferDialog from './TransferDialog'

interface ITransfersData {
    month: string
    total: number
    fee: number
    transferCount: number
}

const TransfersPage = ({ userId }: { userId: string }) => {

    const [transfers, setTransfers] = useState<ITransfer[]>()
    const [transfersData, setTransfersData] = useState<ITransfersData[]>([]);
    const [year, setYear] = useState<number>(2024);

    useEffect(() => {
        async function getTransfers() {
            const requestedTransfers = await getAllTransfers(userId)
            setTransfers(requestedTransfers);
        }

        getTransfers()
    }, [])

    useEffect(() => {

        async function getData() {
            const requestedTransfers = await getTransfersData(userId, year)
            setTransfersData(requestedTransfers)
        }

        getData()
    }, [year])

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[950px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='w-full md:w-11/12 px-2 py-4 md:p-8 my-3 rounded-lg bg-red-500 text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Transfers Data</p>
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
                                        <p className='text-[13px] lg:text-[15px]'>$ Fee</p>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2'>
                                        <p className='text-[13px] lg:text-[15px]'># Transfers</p>
                                    </div>
                                </div>
                                {transfersData && transfersData.map((data: ITransfersData, index: number) => (
                                    <div key={index} className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[12px] lg:text-[15px]'>{data?.month}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[13px] lg:text-[15px]'>$ {(data?.total).toLocaleString()}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[13px] lg:text-[15px]'>$ {(data?.fee).toLocaleString()}</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <p className='text-[13px] lg:text-[15px]'>{(data?.transferCount).toLocaleString()}</p>
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
                                <p className='font-semibold text-[20px]'>Transfers breakdown</p>
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
                                {transfers && transfers.map((transfer: ITransfer, index: number) => (
                                    <div key={index} className='flex w-full'>
                                        <TransferDialog transfer={transfer} />
                                    </div>
                                ))}
                                {transfers && <LoadMoreTransfers userId={userId} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransfersPage

const LoadMoreTransfers = ({ userId }: { userId: string }) => {

    const [transfers, setTransfers] = useState<ITransfer[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState(1)

    const getTransfers = async () => {

        setLoading(true)
        const requestedTransfers = await getPaginatedTransfers(userId, page * 3)
        setTransfers((prevTransfers) => [...prevTransfers, ...requestedTransfers]);
        setLoading(false)
        setPage(page + 1);

    }

    return (
        <>
            {transfers && transfers.map((transfer: ITransfer, index: number) => (
                <div key={index} className='flex w-full'>
                    <TransferDialog transfer={transfer} />
                </div>
            ))}
            {!loading && <div className='flex justify-center items-center mt-3 hover:cursor-pointer' onClick={getTransfers}>
                <p className='inline-flex bg-white text-red-500 px-2 py-1 rounded-lg font-bold'>Load More</p>
            </div>}
            {loading && <div className='flex justify-center items-center mt-3'>
                <p className='inline-flex bg-white text-red-500 font-bold px-2 py-1 rounded-lg'>Loading...</p>
            </div>}
        </>
    );
};