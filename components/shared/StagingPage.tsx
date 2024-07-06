'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const StagingPage = () => {

    const router = useRouter();  // Get the router object

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 15000);

        return () => clearTimeout(timer);
    }, [router]);


    return (
        <div className='flex flex-col justify-center items-center gap-3'>
            <Image src={'/images/staging.jpg'} className='h-[300px] w-[300px] rounded-lg' alt='logo' height={1000} width={1000} />
            <p className='text-[16px] font-semibold'>Please wait</p>
            <p className='text-[16px] font-semibold'>{`We're`} setting up your account</p>
            <Image src={'/icons/spinner.svg'} alt='spinner' height={30} width={30} className=' animate-spin' />
        </div>
    )
}

export default StagingPage