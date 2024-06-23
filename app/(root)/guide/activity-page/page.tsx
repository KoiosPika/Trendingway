import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Activity Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5'>1. Orders Page</p>
                    <Image src={'/images/Screen7.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• On the top, you can find summarized information about the page</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• When {`you're`} on the Orders Tab, you will be able to see all of the orders you received</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• On each order, you can either press {`" Start Insight "`} button to get directed to the insight page to complete the order or you can hit {`" Cancel Order "`} to cancel the order and refund the price to your customer</p>
                    <Image src={'/images/Screen8.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/2 w-full rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• When you press cancel order, you can leave a note to your customer telling them why {`you're`} canceling their order</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• Remember: if you {`don't`} give an insight within 5 days of the order, the customer can withdraw their order and you will not earn anything</p>
                </div>
            </div>
        </div>
    )
}

export default page