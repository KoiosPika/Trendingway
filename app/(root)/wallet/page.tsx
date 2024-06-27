import Checkout from '@/components/shared/Checkout'
import { getAllOrders } from '@/lib/actions/order.actions'
import { getAllRefunds } from '@/lib/actions/refund.actions'
import { getAllSpendings } from '@/lib/actions/spending.actions'
import { getUserFinancials } from '@/lib/actions/userFinancials.model'
import { IOrder } from '@/lib/database/models/order.model'
import { IRefund } from '@/lib/database/models/refund.model'
import { ISpending } from '@/lib/database/models/spending.model'
import { IUserFinancials } from '@/lib/database/models/userFinancials.model'
import { formatDate } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user: IUserFinancials = await getUserFinancials(userId)

    const orders = await getAllOrders(userId);

    const spendings = await getAllSpendings(userId)

    const refunds = await getAllRefunds(userId)

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-5/6 bg-white'>
                        <div className='grid grid-cols-1 md:grid-cols-2 w-11/12 gap-3 md:mt-5'>
                            <div className='flex flex-col bg-red-500 w-full p-4 rounded-lg h-[140px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                            <div className='flex flex-col bg-green-700 w-full p-4 rounded-lg h-[140px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row items-center gap-2'>
                                    <Image src={'/icons/wallet.svg'} alt='wallet' height={20} width={20} />
                                    <p className='text-white font-semibold text-[18px]'>Earnings Information</p>
                                </div>
                                <p className='ml-7 text-[15px] text-white mt-1'>Transfer funds and see earning details</p>
                                <Link href={'/wallet/earnings'} className='flex flex-row items-center gap-2 ml-auto mt-auto bg-white px-2 py-1 rounded-lg h-[40px]'>
                                    <Image src={'/icons/dollar.svg'} alt='dollar' height={15} width={15} />
                                    <p className='font-semibold text-[13px]'>Go to Earnings</p>
                                </Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 w-11/12 gap-4 mt-2'>
                            <div id='recharge' className='w-full p-4 md:p-8 my-3 rounded-lg bg-blue-600 text-white md:h-[400px] h-[360px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex flex-row gap-2 mb-4'>
                                    <Image src={'/icons/plus-white.svg'} alt='wallet' height={20} width={20} />
                                    <p className='font-semibold text-[20px]'>Recharge your wallet</p>
                                </div>
                                <div className='grid grid-cols-1 gap-3 text-center'>
                                    <Checkout userId={userId} amount={4.99} coins={2} />
                                    <Checkout userId={userId} amount={7.99} coins={5} />
                                    <Checkout userId={userId} amount={14.99} coins={9} />
                                    <Checkout userId={userId} amount={19.99} coins={15} />
                                    <Checkout userId={userId} amount={24.99} coins={20} />
                                </div>
                            </div>
                            <div className='w-full px-2 py-4 lg:p-8 my-3 rounded-lg bg-orange-500 text-white md:h-[400px] h-[360px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                                    {orders.length > 0 && orders.map((order: IOrder, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center p-5 gap-2 bg-white text-black rounded-lg'>
                                            <div className='w-full flex flex-row items-center gap-5'>

                                                <p className='font-semibold text-[13px] lg:text-[15px]'>${(order.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center gap-5'>

                                                <p className='font-semibold text-[13px] lg:text-[15px]'>{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {orders.length > 0 && <Link href={'/wallet/recharges'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>}
                                </div>
                                {orders.length == 0 &&
                                    <div className='flex justify-center items-center h-3/4'>
                                        <p className='text-[18px] font-bold'>No Orders Yet</p>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 w-11/12 gap-4'>
                            <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-[#178EA0] text-white md:h-[400px] h-[360px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                                    {spendings.length > 0 && spendings.map((spending: ISpending, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center px-2 py-4 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>${(spending?.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center'>
                                                <p className='font-semibold text-[12px] lg:text-[15px]'>{formatDate(spending?.createdAt)}</p>
                                            </div>
                                            {spending.service == 'VideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'LongVideoInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-purple-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'ProfileInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />

                                                </div>}
                                            {spending.service == 'PersonalInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/question.svg'} alt='video' width={200} height={200} className='bg-pink-600 w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'OpinionInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/gavel.svg'} alt='video' width={200} height={200} className='bg-[#3b711e] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                            {spending.service == 'LongOpinionInsight' &&
                                                <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-2'>
                                                    <Image src={'/icons/feather.svg'} alt='video' width={200} height={200} className='bg-[#3e2ea3] w-[25px] h-[25px] md:w-[30px] md:h-[30px] p-[3px] rounded-full' />
                                                </div>}
                                        </div>
                                    ))}

                                    {spendings.length > 0 && <Link href={'/wallet/spendings'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>}
                                </div>
                                {spendings.length == 0 &&
                                    <div className='flex justify-center items-center h-3/4'>
                                        <p className='text-[18px] font-bold'>No Spendings Yet</p>
                                    </div>
                                }
                            </div>
                            <div className='w-full px-2 py-4 lg:p-8 my-2 rounded-lg bg-[#A81EE8] text-white md:h-[400px] h-[360px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                                    {refunds.length > 0 && refunds.map((refund: IRefund, index: number) => (
                                        <div key={index} className='flex flex-row justify-center items-center p-5 gap-2 bg-white text-black rounded-lg relative'>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>${(refund?.amount).toFixed(2)}</p>
                                            </div>
                                            <div className='w-full flex flex-row items-center gap-5'>
                                                <p className='font-semibold text-[13px] lg:text-[15px]'>{formatDate(refund.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {refunds.length > 0 && <Link href={'/wallet/refunds'} className='ml-auto'>
                                        <p className='bg-white px-4 py-2 rounded-lg inline-flex text-black text-[13px] font-semibold hover:bg-yellow-400'>More Details {`->`}</p>
                                    </Link>}
                                </div>
                                {refunds.length == 0 &&
                                    <div className='flex justify-center items-center h-3/4'>
                                        <p className='text-[18px] font-bold'>No Refunds Yet</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page