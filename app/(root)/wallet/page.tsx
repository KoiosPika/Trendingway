import Checkout from '@/components/shared/Checkout'
import StripeSetup from '@/components/shared/StripeSetup'
import { getAllEarnings } from '@/lib/actions/earning.actions'
import { getAllOrders, getOrdersData } from '@/lib/actions/order.actions'
import { getAllRefunds } from '@/lib/actions/refund.actions'
import { getAllSpendings } from '@/lib/actions/spending.actions'
import { getUserDataByUserId } from '@/lib/actions/userData.actions'
import { IEarning } from '@/lib/database/models/earning.model'
import { IOrder } from '@/lib/database/models/order.model'
import { IRefund } from '@/lib/database/models/refund.model'
import { ISpending } from '@/lib/database/models/spending.model'
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

    const earnings = await getAllEarnings(userId);

    const spendings = await getAllSpendings(userId)

    const refunds = await getAllRefunds(userId)

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='grid grid-cols-1 md:grid-cols-2 w-11/12 gap-3 md:mt-5'>
                            <div className='flex flex-col bg-red-500 w-full p-4 rounded-lg' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                            <div className='flex flex-col bg-green-600 w-full p-4 rounded-lg' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                        <div className='grid grid-cols-1 sm:grid-cols-2 w-11/12 gap-4'>
                            <div id='recharge' className='w-full p-4 md:p-8 my-3 rounded-lg bg-blue-600 text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row gap-2 mb-4'>
                                    <Image src={'/icons/plus-white.svg'} alt='wallet' height={20} width={20} />
                                    <p className='font-semibold text-[20px]'>Recharge your wallet</p>
                                </div>
                                <div className='grid grid-cols-2 gap-3 text-center'>
                                    <Checkout userId={userId} amount={3} />
                                    <Checkout userId={userId} amount={8} />
                                    <Checkout userId={userId} amount={15} />
                                    <Checkout userId={userId} amount={20} />
                                    <Checkout userId={userId} amount={25} />
                                    <Checkout userId={userId} amount={30} />
                                    <Checkout userId={userId} amount={35} />
                                    <Checkout userId={userId} amount={40} />
                                    <Checkout userId={userId} amount={45} />
                                    <Checkout userId={userId} amount={50} />
                                </div>
                            </div>
                            <div className='w-full px-2 py-4 lg:p-8 my-3 rounded-lg bg-orange-500 text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row gap-2 mb-4'>
                                    <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                    <p className='font-semibold text-[20px]'>Recharge Orders</p>
                                </div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/dollar-black.svg'} alt='dollar' height={12} width={12} />
                                            <p className='text-[13px] lg:text-[15px]'>Amount</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                            <p className='text-[13px] lg:text-[15px]'>When</p>
                                        </div>
                                    </div>
                                    {orders.map((order: IOrder, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center p-5 gap-2 bg-white text-black rounded-lg'>
                                            <div className='w-full flex flex-row items-center gap-5'>

                                                <p className='font-semibold text-[13px] lg:text-[15px]'>${(order.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center gap-5'>

                                                <p className='font-semibold text-[13px] lg:text-[15px]'>{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href={'/wallet/recharges'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <StripeSetup userId={userId} />

                        <div className='grid grid-cols-1 sm:grid-cols-2 w-11/12 gap-4'>
                        <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-[#178EA0] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row gap-2 mb-4'>
                                    <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                    <p className='font-semibold text-[20px]'>Spendings</p>
                                </div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/dollar-black.svg'} alt='dollar' height={12} width={12} />
                                            <p className='text-[13px] lg:text-[15px]'>Amount</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                            <p className='text-[13px] lg:text-[15px]'>When</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/wrench.svg'} alt='dollar' height={14} width={14} />
                                            <p className='text-[13px] lg:text-[15px]'>Service</p>
                                        </div>
                                    </div>
                                    {spendings.map((spending: ISpending, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center px-2 py-4 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>${(spending?.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(spending?.createdAt)}</p>
                                            </div>
                                            {spending.service == 'TextInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'LongTextInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'VideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'LongVideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#B69615] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'TextProfileInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />

                                                </div>}
                                            {spending.service == 'VideoProfileInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                        </div>
                                    ))}
                                    
                                    <Link href={'/wallet/spendings'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>
                                </div>
                            </div>
                            <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-[#1AAD7A] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row gap-2 mb-4'>
                                    <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                    <p className='font-semibold text-[20px]'>Earnings</p>
                                </div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/dollar-black.svg'} alt='dollar' height={12} width={12} />
                                            <p className='text-[13px] lg:text-[15px]'>Amount</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                            <p className='text-[13px] lg:text-[15px]'>When</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/wrench.svg'} alt='dollar' height={14} width={14} />
                                            <p className='text-[13px] lg:text-[15px]'>Service</p>
                                        </div>
                                    </div>
                                    {earnings.map((earning: IEarning, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center px-2 py-4 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>${(earning?.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(earning?.createdAt)}</p>
                                            </div>
                                            {earning.service == 'TextInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {earning.service == 'LongTextInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {earning.service == 'VideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {earning.service == 'LongVideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#B69615] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {earning.service == 'TextProfileInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />

                                                </div>}
                                            {earning.service == 'VideoProfileInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                        </div>
                                    ))}
                                    <Link href={'/wallet/earnings'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>


                        <div className='grid grid-cols-1 sm:grid-cols-2 w-11/12 gap-4'>
                            <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-[#D62055] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row gap-2 mb-4'>
                                    <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                    <p className='font-semibold text-[20px]'>Payout Orders</p>
                                </div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/dollar-black.svg'} alt='dollar' height={12} width={12} />
                                            <p className='text-[13px] lg:text-[15px]'>Amount</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                            <p className='text-[13px] lg:text-[15px]'>When</p>
                                        </div>
                                    </div>
                                    {orders.map((order: IOrder, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center p-5 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>${(order.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href={'/wallet/payouts'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>
                                </div>
                            </div>
                            <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-[#A81EE8] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row gap-2 mb-4'>
                                    <Image src={'/icons/invoice.svg'} alt='wallet' height={20} width={20} />
                                    <p className='font-semibold text-[20px]'>Refunds</p>
                                </div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div className='flex flex-row justify-center items-center p-2 gap-2 bg-white text-black font-bold rounded-lg'>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/dollar-black.svg'} alt='dollar' height={12} width={12} />
                                            <p className='text-[13px] lg:text-[15px]'>Amount</p>
                                        </div>
                                        <div className='w-full flex flex-row items-center gap-2'>
                                            <Image src={'/icons/clock-black.svg'} alt='dollar' height={14} width={14} />
                                            <p className='text-[13px] lg:text-[15px]'>When</p>
                                        </div>
                                    </div>
                                    {refunds.map((refund: IRefund, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center p-5 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>${(refund?.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>{formatDate(refund.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href={'/wallet/refunds'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>
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