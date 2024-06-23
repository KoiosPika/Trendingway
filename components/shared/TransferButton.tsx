'use client'

import { createTransfer } from '@/lib/actions/earning.actions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TransferButton = ({ userId, transferDeductible }: { userId: string, transferDeductible:boolean }) => {

    const [status, setStatus] = useState<'Ready' | 'Fail' | 'Success' | 'Loading'>('Ready')
    const router = useRouter();

    const TransferFunds = async () => {
        setStatus('Loading')
        const TransactionStatus = await createTransfer(userId)
        if (TransactionStatus) {
            setStatus('Success')
        } else {
            setStatus('Fail')
        }

        setTimeout(() => {
            router.push('/wallet/earnings');
        }, 5000);
    }
    return (
        <>
            {status === 'Ready' && <div onClick={TransferFunds} className='flex flex-col gap-2 w-full my-2'>
                <p className='ml-auto px-3 py-1 bg-green-700 rounded-lg text-white font-semibold border-[1px] border-white md:text-[15px] text-[12px] hover:cursor-pointer'>Transfer Funds</p>
                {transferDeductible && <p className='ml-auto text-white font-semibold md:text-[13px] text-[10px]'>NOTE: $2.00 will be deducted from the first transfer of the month</p>}
            </div>}
            {status === 'Loading' && <div onClick={TransferFunds} className='flex w-full my-2'>
                <p className='ml-auto px-3 py-1 bg-green-600 rounded-lg text-white font-semibold border-[1px] border-white md:text-[15px] text-[12px]'>Please Wait...</p>
            </div>}
            {status === 'Success' && <div className='flex w-full my-2'>
                <p className='ml-auto px-3 py-1 bg-green-700 rounded-lg text-white font-semibold border-[1px] border-white md:text-[15px] text-[12px]'>Transfer Completed</p>
            </div>}
            {status === 'Fail' && <div className='flex w-full my-2'>
                <p className='ml-auto px-3 py-1 bg-red-500 rounded-lg text-white font-semibold border-[1px] border-white md:text-[15px] text-[12px]'>Transfer Failed, Please Try Again Later</p>
            </div>}
        </>
    )
}

export default TransferButton