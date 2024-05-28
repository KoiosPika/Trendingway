import Checkout from '@/components/shared/Checkout'
import StripeSetup from '@/components/shared/StripeSetup'
import { getAllOrders } from '@/lib/actions/order.actions'
import { getUserDataByUserId } from '@/lib/actions/userData.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { IUserData } from '@/lib/database/models/userData.model'
import { formatDate } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user: IUserData = await getUserDataByUserId(userId)

    const orders = await getAllOrders(userId);

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-4/5 bg-white'>
                        <div className='flex flex-row items-center mr-auto ml-5'>
                            <Image src={'/icons/sun.svg'} alt='wallet' height={20} width={20} />
                            <p className='ml-3 my-5 text-[22px] font-semibold text-black'>Good Morning, Rami</p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 w-11/12 gap-2'>
                            <div className='flex flex-col bg-red-500 w-full p-4 rounded-lg'>
                                <div className='flex flex-row items-center gap-2'>
                                    <Image src={'/icons/wallet.svg'} alt='wallet' height={20} width={20} />
                                    <p className='text-white font-semibold text-[18px]'>Current Balance</p>
                                </div>
                                <p className='ml-7 text-[25px] font-semibold text-white'>${(user.creditBalance).toFixed(2)}</p>
                                <div className='flex flex-row items-center gap-2 ml-auto bg-white px-2 py-1 rounded-lg h-[40px]'>
                                    <Image src={'/icons/plus.svg'} alt='dollar' height={20} width={20} />
                                    <Link href={'#recharge'} className='font-semibold text-[13px]'>Recharge Now</Link>
                                </div>
                            </div>
                            <div className='flex flex-col bg-green-600 w-full p-4 rounded-lg'>
                                <div className='flex flex-row items-center gap-2'>
                                    <Image src={'/icons/wallet.svg'} alt='wallet' height={20} width={20} />
                                    <p className='text-white font-semibold text-[18px]'>Ready to withdraw</p>
                                </div>
                                <p className='ml-7 text-[25px] font-semibold text-white'>${(user.withdrawBalance).toFixed(2)}</p>
                                <div className='flex flex-row items-center gap-2 ml-auto bg-white px-2 py-1 rounded-lg h-[40px]'>
                                    <Image src={'/icons/dollar.svg'} alt='dollar' height={15} width={15} />
                                    <p className='font-semibold text-[13px]'>Initiate Transaction</p>
                                </div>
                            </div>
                        </div>
                        <div id='recharge' className='w-11/12 p-8 my-3 rounded-lg bg-blue-600 text-white'>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/plus-white.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Recharge your wallet</p>
                            </div>
                            <div className='grid grid-cols-2 gap-3 text-center'>
                                <Checkout userId={userId} amount={2} />
                                <Checkout userId={userId} amount={5} />
                                <Checkout userId={userId} amount={15} />
                                <Checkout userId={userId} amount={20} />
                            </div>
                        </div>
                        <StripeSetup userId={userId}/>

                        <div className='w-11/12 p-8 my-2 rounded-lg bg-orange-500 text-white'>
                            <div className='flex flex-row gap-2 mb-4'>
                                <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                <p className='font-semibold text-[20px]'>Recent Orders</p>
                            </div>
                            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 font-semibold'>
                                {orders.map((order: IOrder, index: number) => (
                                    <div key={index} className='flex flex-col justify-center items-center p-5 bg-white text-black rounded-lg'>
                                        <p className='text-[10px] md:text-[13px]'>{formatDate(order.createdAt)}</p>
                                        <p className='text-[30px] md:text-[35px] mb-2'>${(order.amount).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page