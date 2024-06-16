'use client'

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SessionRevoked = () => {

    const router = useRouter();

    useEffect(() => {

        const timer = setTimeout(() => {
            router.replace('/sign-in?redirectTo=%2Fprofile');
        }, 10000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[950px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <h2 className='font-bold text-[16px] md:text-[22px]'>Your session has been revoked</h2>
                        <h3 className='font-bold text-[16px] md:text-[22px]'>Please wait to be redirected</h3>
                        <Image src={'/images/uncut.png'} alt="logo" className="h-[150px] w-[150px] md:h-[250px] md:w-[250px] animate-spin my-3" height={1000} width={1000} />
                        <h3 className='font-bold text-[16px] md:text-[22px]'>Loading...</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionRevoked