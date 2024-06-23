import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Activity Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Orders Page</p>
                    <Image src={'/images/Screen7.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On the top, you can find summarized information about the page</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When {`you're`} on the Orders Tab, you will be able to see all of the orders you received</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On each order, you can either press {`" Start Insight "`} button to get directed to the insight page to complete the order or you can hit {`" Cancel Order "`} to cancel the order and refund the price to your customer</p>
                    <Image src={'/images/Screen10.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press Start Insight, you will be directed to insight page where {`you'll`} be filling an insight form about different elements</p>
                    <Image src={'/images/Screen11.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/3 w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press Start Insight and the Insight is Personal Insight, {`you'll`} be directed to a chat page like the image shows where you can responde to the request</p>
                    <Image src={'/images/Screen8.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/2 w-full rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press Cancel Order, you can leave a note to your customer telling them why {`you're`} canceling their order</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Remember: if you {`don't`} give an insight within 5 days of the order, the customer can withdraw their order and you will not earn anything</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Requests Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>3. Insights Page</p>
                    <Image src={'/images/Screen9.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When {`you're`} on the Insights Tab, you will be able to see all of the insights your insighters have given based on your requests</p>
                    <Image src={'/images/Screen12.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press Go To Insight, you will be directed to a page to see the insight you received</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you requested a personal insight, {`you'll`} be directed to chat page like the one above</p>
                    <Image src={'/images/Screen13.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/2 w-full rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• At the bottom of every insight (excluding personal insights) {`you'll`} be able to rate the insight you received</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>4. History Page</p>
                </div>
            </div>
        </div>
    )
}

export default page