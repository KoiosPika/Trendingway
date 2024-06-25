import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Earning Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Main Page</p>
                    <Image src={'/images/Screen22.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When can find a summary of which funds are available for transfer</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can also set up your Stripe Connect Account from here</p>
                    <Image src={'/images/Screen36.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <Image src={'/images/Screen37.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <Image src={'/images/Screen42.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Stripe Connect</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you {`don't`} have an account yet, {`you'll`} need to create one</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you have an account but you {`didn't`} finish your onboarding process, {`you'll`} have to do that</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you finished your onboarding process, {`you'll`} be able to access your express dashboard</p>
                    <Image src={'/images/Screen38.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When Setting up your account, {`you'll`} need to Email address and phone number</p>
                    <Image src={'/images/Screen39.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Then Select the Country as United States, and Type of business as Individual</p>
                    <Image src={'/images/Screen40.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Then provide your legal name and set your website as the url to your profile such as www.insightend.com/profile/YOUR_USERNAME</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• After that {`you'll`} enter your financial information</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>3. Earnings Page</p>
                    <Image src={'/images/Screen32.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6'/>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can also find a summary of your earnings and what fees we take</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>4. Transfers Page</p>
                    <Image src={'/images/Screen29.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6'/>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can also find same information regarding transfers you made</p>
                    <Image src={'/images/Screen35.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-1/2 rounded-lg'/>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When a $2.00 Stripe Connect Fee is deducted from a transfer, {`you'll`} see it in the dialog under Breakdown section</p>
                </div>
            </div>
        </div>
    )
}

export default page