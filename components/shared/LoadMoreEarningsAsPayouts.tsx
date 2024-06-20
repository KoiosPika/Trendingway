'use client'

import { getPaginatedEarningsAsPayouts } from "@/lib/actions/earning.actions";
import { useState } from "react";
import EarningAsPayoutDialog from "./EarningAsPayoutDialog";
import { IEarning } from "@/lib/database/models/earning.model";

const LoadMoreEarningsAsPayouts = ({ userId }: { userId: string }) => {

    const [earnings, setEarnings] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState(1)

    const getOrders = async () => {

        setLoading(true)
        const requestedEarnings = await getPaginatedEarningsAsPayouts(userId, page * 10)
        setEarnings((prevEarnings) => [...prevEarnings, ...requestedEarnings]);
        setLoading(false)
        setPage(page + 1);

    }

    return (
        <>
            {earnings && earnings.map((earning: IEarning, index: number) => (
                <div key={index} className='flex w-full'>
                    <EarningAsPayoutDialog earning={earning} />
                </div>
            ))}
            {!loading && <div className='flex justify-center items-center mt-3 hover:cursor-pointer' onClick={getOrders}>
                <p className='inline-flex bg-white text-blue-500 font-bold px-2 py-1 rounded-lg'>Load More</p>
            </div>}
            {loading && <div className='flex justify-center items-center mt-3'>
                <p className='inline-flex bg-white text-blue-500 font-bold px-2 py-1 rounded-lg'>Loading...</p>
            </div>}
        </>
    );
};

export default LoadMoreEarningsAsPayouts