'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { cancelOrder } from '@/lib/actions/request.actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CancelRequest = ({ request }: { request: string }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleCancelingRequest = async () => {

        if(loading){
            return;
        }

        setLoading(true);

        await cancelOrder(request, 'Canceled By Customer');
        setLoading(false);
        router.refresh();
    }

    return (
        <Button className='bg-red-500 w-1/6 flex flex-row items-center justify-center gap-2 py-1 rounded-lg mt-4 mb-2 hover:cursor-default hover:bg-yellow-400' onClick={handleCancelingRequest}>
            {!loading && <p className='text-[13px] md:text-[16px] text-white font-bold'>X</p>}
            {loading && <Image src={'/icons/spinner.svg'} alt='spinner' height={40} width={40} className=' animate-spin'/>}
        </Button>
    )
}

export default CancelRequest