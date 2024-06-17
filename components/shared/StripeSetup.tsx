'use client'

import { createAccountLink, handleCreatingAccount } from "@/lib/actions/connect.actions"
import Image from "next/image"
import Link from "next/link"

const StripeSetup = ({ userId, account_id, onboardingCompleted }: { userId: string, account_id: string, onboardingCompleted: boolean }) => {

    const handleCreate = async () => {
        const link = await handleCreatingAccount(userId);

        if (link) {
            window.location.href = link;
        }
    }

    const handleCreateAccountLink = async () => {
        const link = await createAccountLink(userId);

        if (link) {
            window.location.href = link;
        }
    }
    return (
        <div className='w-11/12 p-4 md:p-8 my-2 rounded-lg bg-[#6772e4] text-white' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
            <div className='flex flex-row items-center gap-2'>
                <Image className='rounded-md border-2 border-white h-[30px] w-[30px]' src={'/icons/stripe.png'} alt='stripe' height={200} width={200} />
                <p className='font-bold text-[20px]'>Stripe Connect Set up</p>
            </div>
            {(!account_id && !onboardingCompleted) && <p className='ml-9 md:text-[16px] text-[13px] mt-3'>Set up your Stripe Connect Express account to receive the money</p>}
            {(account_id && !onboardingCompleted) && <p className='ml-9 md:text-[16px] text-[13px] mt-3'>{`Looks like you haven't finished setting up your account. You can complete your onboarding process by using the link below`}</p>}
            {(account_id && onboardingCompleted) && <p className='ml-9 md:text-[16px] text-[13px] mt-3'>Your Express account has been sucessfully set up! You can access your dashboard from the link below</p>}
            
            
            {(!account_id && !onboardingCompleted) && <div className='flex flex-row w-full mt-3'>
                <p onClick={handleCreate} className='ml-auto bg-white text-[#6772e4] font-semibold py-2 px-4 cursor-pointer inline-block border-[2px] border-yellow-500 rounded-full text-[12px] md:text-[16px]'>Set Up Now!</p>
            </div>}
            {(account_id && !onboardingCompleted) && <div className='flex flex-row w-full mt-3'>
                <p onClick={handleCreateAccountLink} className='ml-auto bg-white text-[#6772e4] font-semibold py-2 px-4 cursor-pointer inline-block border-[2px] border-yellow-500 rounded-full text-[12px] md:text-[16px]'>Finish onboarding</p>
            </div>}
            {(account_id && onboardingCompleted) && 
            <Link href={'https://www.google.com'} target="_blank" className='flex flex-row w-full mt-3'>
                <p className='ml-auto bg-white text-[#6772e4] font-semibold py-2 px-4 cursor-pointer inline-block border-[2px] border-yellow-500 rounded-full text-[12px] md:text-[16px]'>Go to Express Dashboard</p>
            </Link>}
        </div>
    )
}

export default StripeSetup