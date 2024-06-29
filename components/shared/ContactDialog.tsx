'use client'

import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useRouter } from 'next/navigation'
import { createEmail } from '@/lib/actions/connect.actions'

const ContactDialog = () => {

    const router = useRouter();
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [Loading, setLoading] = useState<boolean>(false)

    const handleEmail = async () => {
        setLoading(true);
        await createEmail(email, message)
        router.push('/profile')

        setLoading(false);

    }


    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex w-full'>
                <div className='mt-5 ml-auto mr-[30px] flex justify-center gap-2 items-center bg-black px-3 py-1 rounded-md'>
                    <Image src={'/icons/email-white.svg'} alt='guide' height={20} width={20} />
                    <p className='text-white font-semibold text-[17px]'>Contact Us</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-yellow-400 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-black font-bold text-[22px] rounded-md">Contact Us</p>
                        <AlertDialogCancel className="rounded-full text-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className='flex flex-col justify-center items-center w-full gap-3 my-3'>
                    <p className='font-bold mr-auto bg-yellow-400 px-[8px] py-1 rounded'>Email:</p>
                    <Input placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border-[1px] border-black text-[16px]' />
                </div>
                <div className='flex flex-col justify-center items-center w-full gap-3 my-3'>
                    <p className='font-bold mr-auto bg-yellow-400 px-[8px] py-1 rounded'>How can we help you:</p>
                    <Textarea placeholder='What can we help you with' value={message} onChange={(e) => setMessage(e.target.value)} className='w-full border-[1px] border-black text-[16px] h-[150px]' />
                </div>
                {!Loading && <Button onClick={handleEmail} className='my-5 bg-white border-2 border-black hover:border-white text-black hover:text-white w-full text-center p-2 rounded-lg'>
                    <p className='font-bold text-[16px]'>Submit</p>
                </Button>}
                {Loading && <Button disabled className='my-5 bg-yellow-400 hover:bg-yellow-400 text-black w-full text-center p-2 rounded-lg'>
                    <p className='font-semibold text-[16px]'>Submitting...</p>
                </Button>}
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ContactDialog