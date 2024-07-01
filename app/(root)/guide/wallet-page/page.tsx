import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Wallet Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Main Page</p>
                    <Image src={'/images/guide/wallet/Wallet_1.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-10/12' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On the main page, you can see your current balance, recharge your wallet and check your recharge orders, spendings and refunds.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2 bg-yellow-300'>• Note: All recharges are finalized and non-refundable.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can navigate to recharges page, spendings page and refunds page for more details.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Recharge Page</p>
                    <Image src={'/images/guide/wallet/Wallet_2.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page you can find breakdown of all your recharges per month (amount & number of recharges) by year.</p>
                    <Image src={'/images/guide/wallet/Wallet_3.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4 rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can also click on any of the recharges under Order Breakdown and you can get more information about the recharge.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>3. Spendings Page</p>
                    <Image src={'/images/guide/wallet/Wallet_4.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page you can find all your sependings sorted by latest first</p>
                    <Image src={'/images/guide/wallet/Wallet_5.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4 rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can click on any of the spendings to get more details about it</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>4. Refunds Page</p>
                    <Image src={'/images/guide/wallet/Wallet_6.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page you can find all your refunds sorted by latest first</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Note: A refund is when an insighter cancels your request. Therefore, the money is added back to your Current Balance on the main page.</p>
                    <Image src={'/images/guide/wallet/Wallet_7.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4 rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can click on any of the refunds to get more details about it</p>
                </div>
            </div>
        </div>
    )
}

export default page