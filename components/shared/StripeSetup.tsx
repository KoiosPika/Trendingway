'use client'

import { handleCreatingAccount } from "@/lib/actions/connect.actions"
import Image from "next/image"

const StripeSetup = ({ userId }: { userId: string }) => {

    const handleCreate = async () => {
        const link = await handleCreatingAccount(userId);

        if (link) {
            window.location.href = link; // Redirect to the Stripe onboarding link
          } else {
            console.error('Error creating account link');
          }
    }
    return (
        <div className='w-11/12 p-8 my-3 rounded-lg bg-[#6772e4] text-white'>
            <div className='flex flex-row items-center gap-2'>
                <Image className='rounded-md border-2 border-white h-[30px] w-[30px]' src={'/icons/stripe.png'} alt='stripe' height={200} width={200} />
                <p className='font-bold'>Stripe Connect Set up</p>
            </div>
            <p className='ml-9'>Set up your Stripe Connect Express account to receive the money</p>
            <div className='flex flex-row w-full mt-3'>
                <p onClick={handleCreate} className='ml-auto bg-white text-[#6772e4] font-semibold py-2 px-4 cursor-pointer inline-block border-[2px] border-yellow-500 rounded-full'>Set Up Now!</p>
            </div>
        </div>
    )
}

export default StripeSetup