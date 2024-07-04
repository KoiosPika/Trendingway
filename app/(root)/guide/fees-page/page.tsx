import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Fees Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Service Fee</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• We collect a 13% service fee from every completed service.</p>
                    <div className='flex flex-row items-center w-full mt-2'>
                        <p className='font-bold text-[12px] md:text-[16px] ml-3'>
                            • You can access the
                            <a href="/wallet/earnings/details" className='mx-[6px] bg-yellow-400 rounded-md px-2 inline-block'>
                                Earning Page
                            </a>
                            and click on any specific earning to view detailed information about the fee, similar to the example shown below
                        </p>
                    </div>
                    <Image src={'/images/guide/fees/Fees_1.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5 rounded-lg' />
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Transfer Fee</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• We deduct 5.5% + 75¢ from every completed transfer.</p>
                    <div className='flex flex-row items-center w-full mt-2'>
                        <p className='font-bold text-[12px] md:text-[16px] ml-3'>
                            • Visit the
                            <a href="/wallet/earnings/details" className='mx-[6px] bg-yellow-400 rounded-md px-2 inline-block'>
                                Transfer Page
                            </a>
                            and click on any transaction to view comprehensive details about the fee, as depicted in the image below.
                        </p>
                    </div>
                    <Image src={'/images/guide/fees/Fees_2.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5 rounded-lg' />
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>3. Stripe Fee</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• We charge a $2.00 fee on the first transfer of each month.</p>
                    <div className='flex flex-row items-center w-full mt-2'>
                        <p className='font-bold text-[12px] md:text-[16px] ml-3'>
                            • Navigate to the
                            <a href="/wallet/earnings/details" className='mx-[6px] bg-yellow-400 rounded-md px-2 inline-block'>
                                Transfer Page
                            </a>
                            and select the first transfer of any month to view specific details about the fee, as shown in the image below.
                        </p>
                    </div>
                    <Image src={'/images/guide/fees/Fees_3.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5 rounded-lg' />
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>4. Fee Allocation</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• The fees we collect are allocated towards supporting a variety of essential services, extending beyond mere profit generation.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] mb-5 mt-2'>• Below is a breakdown of the services utilized:</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>1. Communication and Collaboration Services</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>2. Data Storage Services</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>3. Payment Processing Servcies</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>4. User Account and Authentication Services</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>5. Legal Compliance Servcies</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>6. Business Administration Services</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>7. Website Hosting Services</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-1'>8. Domain Management Services</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] mb-5 mt-2'>• This structure ensures a robust and secure infrastructure that enhances user experience and operational efficiency.</p>
                </div>
            </div>
        </div>
    )
}

export default page