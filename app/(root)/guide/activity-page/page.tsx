import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Activity Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Orders Page</p>
                    <Image src={'/images/guide/activity/Activity_1.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• At the top of the page, you will find a summary that provides an overview of the {`page's`} contents.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When {`you're`} on the Orders Tab, you will be able to see all of the orders you received.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• For each order, you have the option to either click the {`"Start Insight"`} button to proceed to the insight page and fulfill the order, or you can click {`"Cancel Order"`} to terminate the order and issue a refund to your customer.</p>
                    <Image src={'/images/guide/activity/Activity_2.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press {`"Start Insight"`}, you will be directed to the insight page where you will complete a detailed insight form, addressing various elements of the service requested.</p>
                    <Image src={'/images/guide/activity/Activity_3.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/2 w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press {`"Start Insight"`} and the request is a Personal Insight request, you will be directed to a chat interface, as depicted in the image, where you can directly respond to the {`customer's`} request.</p>
                    <Image src={'/images/guide/activity/Activity_4.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/2 w-full rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press {`"Cancel Order"`}, you have the option to leave a note for your customer, explaining the reason for the cancellation of their order.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Remember: if you {`don't`} give an insight within 5 days of the order, the customer can withdraw their order and you will not earn anything.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Requests Page</p>
                    <Image src={'/images/guide/activity/Activity_5.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page, you can view a list of all your requests.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Only requests that are still awaiting insights or have been canceled will appear on this page.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you have made a request and five days have passed without receiving an insight, you will have the option to cancel the request.</p>
                    <Image src={'/images/guide/activity/Activity_6.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/2 w-full rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If the request is canceled by an insighter, you can click on the {`"Canceled & Refunded"`} button to view the reason why your insighter decided to cancel the request.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>3. Insights Page</p>
                    <Image src={'/images/guide/activity/Activity_7.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you are on the Insights Tab, you will be able to view all the insights provided by insighters in response to your requests.</p>
                    <Image src={'/images/guide/activity/Activity_8.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When you press {`"Go To Insight"`}, you will be directed to a page where you can view the insight you received.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you requested a personal insight, you will be taken to a chat page similar to the one mentioned above.</p>
                    <Image src={'/images/guide/activity/Activity_9.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-1/2 w-full rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• At the bottom of every insight (excluding personal insights), {`you'll`} have the option to rate the insight you received.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>4. History Page</p>
                    <Image src={'/images/guide/activity/Activity_10.PNG'} alt='photo' height={1500} width={1500} className='my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On the History tab, {`you'll`} find a record of all orders you have received.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Each order will display a status to indicate the action taken with the request.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Status {`'Awaiting'`} means the you {`haven't`} insighted the order yet.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Status {`'Canceled'`} means the you have canceled the order.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Status {`'Completed'`} means the you already insighted the order.</p>
                </div>
            </div>
        </div>
    )
}

export default page