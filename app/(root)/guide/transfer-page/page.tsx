import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Transfer Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Main Layout</p>
                    <Image src={'/images/Screen23.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page, you can find the funds that are available for transfer and from how many insights these funds are collected.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2 bg-yellow-300'>• You have to have at least 10 insights to make a transfer</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2 bg-yellow-300'>• Each transfer will only process 150 insights. Therefore, if you have more than 150 insights available for transfer, you need to rund multiple transfers</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Each earning can have one of there availability status:</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Available: The earning is ready to be transfered</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Withdrawn: The earning has already been transfered</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Time remaining: If the earning has not been transfered yet and is not available yet, it will show a counter to when it will be available</p>
                    <Image src={'/images/Screen26.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this image, I have 10 available earnings ready to be transfered</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When this happens, the button {`' Transfer Funds '`} will appear</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Press that button to transfer funds to your Stripe Connect Account</p>
                    <Image src={'/images/Screen24.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press on any of the earnings, it will give you these details that includes the status of the earning and when it will be available</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2 bg-yellow-300'>• Note: Because this is a guide, the earnings are available immediately, however, just like mentioned in the Terms of Use, all earnings will be available for transferal 3 days after completing the insight</p>
                </div>
            </div>
        </div>
    )
}

export default page