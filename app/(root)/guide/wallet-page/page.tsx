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
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On the main page, you have access to view your current balance, points count, recharge your wallet, and review details of your recharge orders, spendings, and refunds, providing a comprehensive overview of your financial activities.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2 bg-yellow-300'>• Note: All recharges are finalized and non-refundable.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can navigate to the Recharges, Spendings, and Refunds pages for more detailed information on each respective financial activity.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Redeeming Points</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Points are awarded upon recharging your wallet.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• The number of points earned with each recharge is displayed next to the respective amount on the recharge button.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• A minimum of 1000 points is required for redemption, with each 1000-point increment equating to $1.00 in value.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Points have a validity period of 20 days; however, this expiration date is reset each time a recharge is initiated, extending the usability of your points.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>3. Recharge Page</p>
                    <Image src={'/images/guide/wallet/Wallet_2.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page, you can access a detailed breakdown of all your monthly recharges, including both the amount and the number of recharges, categorized by year.</p>
                    <Image src={'/images/guide/wallet/Wallet_3.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4 rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can also click on any recharge in the Order Breakdown to access detailed information about each specific recharge.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>4. Spendings Page</p>
                    <Image src={'/images/guide/wallet/Wallet_4.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page, you can access a comprehensive list of all your spendings, organized with the most recent activities displayed at the top.</p>
                    <Image src={'/images/guide/wallet/Wallet_5.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4 rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can click on any spending to view more detailed information about that particular order.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>5. Refunds Page</p>
                    <Image src={'/images/guide/wallet/Wallet_6.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• On this page, you can view all your refunds, which are organized with the most recent ones appearing first.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• Please note: A refund occurs when an Insighter cancels your request or you cancel your own request after passed its due time resulting in the funds being returned to your Current Balance which is displayed on the main page.</p>
                    <Image src={'/images/guide/wallet/Wallet_7.PNG'} alt='photo' height={1500} width={1500} className='my-5 md:w-3/4 rounded-lg' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-2'>• You can click on any of the refunds listed to access further details regarding that specific refund.</p>
                </div>
            </div>
        </div>
    )
}

export default page