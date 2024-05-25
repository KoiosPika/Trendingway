'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { createEmail } from '@/lib/actions/connect.actions'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const ContactPage = () => {

    const router = useRouter();
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleEmail = async () => {
        try {
            await createEmail(email, message)
            router.push('/profile')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-[50px] p-3 w-full md:w-4/5 bg-white'>
                        <p className='text-[20px] font-bold my-5'>Contact Us</p>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Email:</p>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border-2 border-black text-[16px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>How can we help you:</p>
                            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className='w-full border-2 border-black text-[16px] h-[150px]' />
                        </div>
                        <Button onClick={handleEmail} className='my-5 bg-green-500 hover:bg-green-500 text-black w-2/5 text-center p-2 rounded-lg'>
                            <p className='font-semibold text-[16px]'>Submit</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage