'use client'

import { redeemPoints } from '@/lib/actions/userFinancials.actions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RedeemPointsButton = ({ userId }: { userId: string }) => {

    const [status, setStatus] = useState<'Ready' | 'Loading' | 'Success' | 'Error'>('Ready')
    const [amount, setAmount] = useState<number>()
    const router = useRouter();

    const handleRedeem = async () => {
        setStatus('Loading');

        const response = await redeemPoints(userId);

        if(response){
            setAmount(response)
            setStatus('Success')
        } else {
            setStatus('Error')
        }

        setTimeout(() => {
            router.refresh();
        }, 1500);
    }
    return (
        <>
            {status === 'Ready' && <div className='w-5/6 bg-blue-600 py-[2px] text-center rounded-sm text-white font-semibold text-[13px] border-[1px] border-white place-self-center hover:cursor-pointer' onClick={handleRedeem}>
                Redeem Points
            </div>}
            {status === 'Loading' && <div className='w-5/6 bg-blue-600 py-[2px] text-center rounded-sm text-white font-semibold text-[13px] border-[1px] border-white place-self-center'>
                Please wait...
            </div>}
            {status === 'Success' && <div className='w-5/6 bg-blue-600 py-[2px] text-center rounded-sm text-white font-semibold text-[13px] border-[1px] border-white place-self-center'>
                ${(amount)?.toFixed(2)} was added to your balance
            </div>}
            {status === 'Error' && <div className='w-5/6 bg-blue-600 py-[2px] text-center rounded-sm text-white font-semibold text-[13px] border-[1px] border-white place-self-center'>
                Error! Please try again later
            </div>}
        </>
    )
}

export default RedeemPointsButton