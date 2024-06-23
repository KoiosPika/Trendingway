'use client'

import Image from 'next/image'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

const DetailsDialog = ({ page }: { page: string }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex w-full justify-center items-center'>
                {page === 'Orders' && 
                <div className='bg-yellow-400 w-full md:w-3/4 flex flex-row items-center rounded-lg md:px-7 px-4 py-2 my-1' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                    <p className='text-[18px] md:text-[22px] font-bold text-black my-2'>Orders Page</p>
                    <p className='ml-auto bg-black text-white px-3 py-1 rounded-full font-bold'>Details {`->`}</p>
                </div>}
                {page === 'Requests' && 
                <div className='bg-yellow-400 w-full md:w-3/4 flex flex-row items-center rounded-lg md:px-7 px-4 py-2 my-1' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                    <p className='text-[18px] md:text-[22px] font-bold text-black my-2'>Requests Page</p>
                    <p className='ml-auto bg-black text-white px-3 py-1 rounded-full font-bold'>Details {`->`}</p>
                </div>}
                {page === 'Insights' && 
                <div className='bg-yellow-400 w-full md:w-3/4 flex flex-row items-center rounded-lg md:px-7 px-4 py-2 my-1' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                    <p className='text-[18px] md:text-[22px] font-bold text-black my-2'>Insights Page</p>
                    <p className='ml-auto bg-black text-white px-3 py-1 rounded-full font-bold'>Details {`->`}</p>
                </div>}
                {page === 'History' && 
                <div className='bg-yellow-400 w-full md:w-3/4 flex flex-row items-center rounded-lg md:px-7 px-4 py-2 my-1' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                    <p className='text-[18px] md:text-[22px] font-bold text-black my-2'>History Page</p>
                    <p className='ml-auto bg-black text-white px-3 py-1 rounded-full font-bold'>Details {`->`}</p>
                </div>}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <div className='flex flex-row items-center gap-2'>
                            {page === 'Orders' && <Image src={'/icons/up.svg'} alt='order' height={25} width={25} />}
                            {page === 'Requests' && <Image src={'/icons/hourglass.svg'} className='rotate-180' alt='order' height={20} width={20} />}
                            {page === 'Insights' && <Image src={'/icons/star-black.svg'} alt='order' height={25} width={25} />}
                            {page === 'History' && <Image src={'/icons/clock-black.svg'} alt='order' height={25} width={25} />}
                            <p className="text-black font-bold">{page} page:</p>
                        </div>
                        <AlertDialogCancel className="rounded-full text-black font-bold border-0 text-[16px] bg-white hover:bg-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                {page === 'Orders' &&
                    <>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'>On this page, you can check out all the services your customers have requested from you</p>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'>You can also cancel an order and provide a message to the customer explianing why</p>
                    </>}
                {page === 'Requests' &&
                    <>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'>On this page, you can check the status of the requests you submitted</p>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'>{`'Awaiting'`} means the insighter {`hasn't`} insighted your order yet </p>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'>{`'Canceled'`} means the insighter has canceled your order</p>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'>You can click on {`'Canceled'`} to see the details of cancelation</p>
                    </>}
                {page === 'Insights' &&
                    <>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'> On this page, you can check out all the insights from your orders</p>
                    </>}
                {page === 'History' &&
                    <>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'> On this page, you can check out all the orders you have received</p>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'> {`'Awaiting'`} means the you {`haven't`} insighted the order yet </p>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'> {`'Canceled'`} means the you have canceled the order</p>
                        <p className='font-semibold bg-slate-200 p-2 rounded-lg'> {`'Completed'`} means the you already insighted the order</p>
                    </>}
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DetailsDialog