import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Transfer Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Main Layout</p>
                    <Image src={'/images/guide/transfer/Transfer_1.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page, you can find the funds that are available for transfer and from how many insights these funds are collected.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2 bg-yellow-300'>• You have to have at least 5 insights to make a transfer</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2 bg-yellow-300'>• Each transfer will only process 150 insights. Therefore, if you have more than 150 insights available for transfer, you need to rund multiple transfers</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Each earning can have one of there availability status:</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Available: The earning is ready to be transfered.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Withdrawn: The earning has already been transfered.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Time remaining: If the earning has not yet been transferred and is not available, a countdown will display until it becomes available.</p>
                    <Image src={'/images/guide/transfer/Transfer_2.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this image, I have 5 available earnings ready to be transfered.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When this happens, the button {`' Transfer Funds '`} will appear.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Press that button to transfer funds to your Stripe Connect Account.</p>
                    <Image src={'/images/guide/transfer/Transfer_3.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4 rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press on any of the earnings, it will give you these details that includes the status of the earning and when it will be available.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Availability days for earnings may vary based on the request date; for instance, earnings from requests made on Monday become available by Thursday, while those from Friday are available by the following Wednesday. This ensures that we have securely received the payment and it is now ready for distribution to your account.</p>
                </div>
            </div>
        </div>
    )
}

export default page