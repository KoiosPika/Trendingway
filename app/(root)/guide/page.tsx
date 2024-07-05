import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-11/12 bg-white'>
                        <div className='w-full md:w-11/12 px-2 py-4 md:p-8 my-3 rounded-lg bg-yellow-400 text-black' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='inline-flex justify-center items-center gap-2 ml-5 md:ml-0 my-5'>
                                <Image src={'/icons/book-black.svg'} className='h-[25px] w-[25px] md:h-[30px] md:w-[30px]' alt='guide' height={30} width={30} />
                                <p className='font-bold text-[20px] md:text-[24px] text-black'>Full Guide</p>
                            </div>
                            <div className='flex flex-col w-full mt-2 gap-[30px]'>
                                <div className='flex flex-col md:flex-row items-center gap-3'>
                                    <a href={'/guide/profile-page'} className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full hover:bg-yellow-300'>
                                        <Image src={'/icons/user.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Profile Page</p>
                                    </a>
                                    <p className='font-bold hidden md:block'>{`->`}</p>
                                    <p className='font-bold block md:hidden'>{`↓`}</p>
                                    <div className='md:w-1/2 w-full font-semibold'>
                                        Review the layout of the profile page to understand how to request services, price for your services, and manage your public account information.
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row items-center gap-3 '>
                                    <a href={'/guide/wallet-page'} className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full md:hidden hover:bg-yellow-300'>
                                        <Image src={'/icons/wallet-black.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Wallet Page</p>
                                    </a>
                                    <p className='font-bold block md:hidden'>{`↓`}</p>
                                    <div className='md:w-1/2 w-full font-semibold'>
                                        Find the options to recharge your account balance, access your earnings page, and view information about your recharges, spendings and refunds.
                                    </div>
                                    <p className='font-bold hidden md:block'>{`<-`}</p>
                                    <a href={'/guide/wallet-page'} className='md:flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full hidden hover:bg-yellow-300'>
                                        <Image src={'/icons/wallet-black.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Wallet Page</p>
                                    </a>
                                </div>
                                <div className='flex flex-col md:flex-row items-center gap-3'>
                                    <a href={'/guide/activity-page'} className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full hover:bg-yellow-300'>
                                        <Image src={'/icons/bell.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Activity Page</p>
                                    </a>
                                    <p className='font-bold hidden md:block'>{`->`}</p>
                                    <p className='font-bold block md:hidden'>{`↓`}</p>
                                    <div className='md:w-1/2 w-full font-semibold'>
                                        Find your orders, requests, insights and history. You can also access the Insight page and the Personal Insight page through here
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row items-center gap-3 '>
                                    <a href={'/guide/earning-page'} className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full md:hidden hover:bg-yellow-300'>
                                        <Image src={'/icons/wallet-black.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Earning Page</p>
                                    </a>
                                    <p className='font-bold block md:hidden'>{`↓`}</p>
                                    <div className='md:w-1/2 w-full font-semibold'>
                                        Navigate to the transfer page, set up your Stripe Connect account, and view detailed information about all your earnings and transfers.
                                    </div>
                                    <p className='font-bold hidden md:block'>{`<-`}</p>
                                    <a href={'/guide/earning-page'} className='md:flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full hidden hover:bg-yellow-300'>
                                        <Image src={'/icons/wallet-black.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Earning Page</p>
                                    </a>
                                </div>
                                <div className='flex flex-col md:flex-row items-center gap-3'>
                                    <a href={'/guide/transfer-page'} className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full hover:bg-yellow-300'>
                                        <Image src={'/icons/transfer.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Transfer Page</p>
                                    </a>
                                    <p className='font-bold hidden md:block'>{`->`}</p>
                                    <p className='font-bold block md:hidden'>{`↓`}</p>
                                    <div className='md:w-1/2 w-full font-semibold'>
                                    Transfer the funds earned from your services to your Stripe Connect account and find information on when your earnings will be available for withdrawal.
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row items-center gap-3 '>
                                    <a href={'/guide/fees-page'} className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full md:hidden hover:bg-yellow-300'>
                                        <Image src={'/icons/dollar-black.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Fees Page</p>
                                    </a>
                                    <p className='font-bold block md:hidden'>{`↓`}</p>
                                    <div className='md:w-1/2 w-full font-semibold'>
                                    Explore details on our fees, their structure, and how they are allocated to enhance and support our services.
                                    </div>
                                    <p className='font-bold hidden md:block'>{`<-`}</p>
                                    <a href={'/guide/fees-page'} className='md:flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2 md:w-1/2 w-full hidden hover:bg-yellow-300'>
                                        <Image src={'/icons/dollar-black.svg'} alt='user' height={30} width={30} />
                                        <p className='mt-2 font-bold'>Fees Page</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page