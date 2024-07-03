import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Earning Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Main Page</p>
                    <Image src={'/images/guide/earning/Earning_1.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page, you can view a summary of your available funds that are ready for transfer.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can also set up your Stripe Connect Account from this page.</p>
                    <Image src={'/images/guide/earning/Earning_2.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <Image src={'/images/guide/earning/Earning_3.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <Image src={'/images/guide/earning/Earning_4.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Stripe Connect</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you do not yet have an account, you will need to create one to proceed.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• If you already have an account but have not completed the onboarding process, you will need to finish this step.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Once your onboarding process is complete, you will gain access to your Express Dashboard.</p>
                    <Image src={'/images/guide/earning/Earning_5.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• When setting up your account, Stripe will ask you to provide email address and phone number.</p>
                    <Image src={'/images/guide/earning/Earning_6.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Then, select {`"United States"`} as the country and choose {`"Individual"`} as the type of business.</p>
                    <Image src={'/images/guide/earning/Earning_7.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Then, enter your legal name and set the URL to your profile, such as www.insightend.com/profile/YOUR_USERNAME, as your website.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• After that, {`you'll`} need to enter your financial information to complete the onboarding process.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>3. Earnings Page</p>
                    <Image src={'/images/guide/earning/Earning_8.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6'/>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can find a summary of your earnings, detailing the amounts, fees, and number of earnings each month, all categorized by year.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>4. Transfers Page</p>
                    <Image src={'/images/guide/earning/Earning_9.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-full md:w-5/6'/>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can also find a summary of your transfers, detailing the amounts, fees, and number of transfers each month, all categorized by year.</p>
                    <div className='w-full flex md:flex-row flex-col items-center justify-center md:gap-2'>
                    <Image src={'/images/guide/earning/Earning_10.PNG'} alt='photo' height={1500} width={1500} className='mt-2 w-2/3 md:w-1/2 rounded-lg'/>
                    <Image src={'/images/guide/earning/Earning_11.PNG'} alt='photo' height={1500} width={1500} className='my-5 w-2/3 md:w-1/2 rounded-lg'/>
                    </div>
                    <div className='flex flex-row items-center w-full mt-2'>
                        <p className='font-bold text-[12px] md:text-[16px] ml-3'>
                            • If you are wondering about the fees we deducte, please navigate to the
                            <a href="/wallet/earnings/details" className='mx-[6px] bg-yellow-400 rounded-md px-2 inline-block'>
                                Fees Page
                            </a>
                            where you can view detailed information about all the fees we collect and how they are utilized.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page