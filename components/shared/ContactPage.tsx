'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { createEmail } from '@/lib/actions/connect.actions'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const ContactPage = () => {

    const router = useRouter();
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [Loading, setLoading] = useState<boolean>(false)

    const handleEmail = async () => {
        try {
            setLoading(true);
            await createEmail(email, message)
            router.push('/profile')

            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-[50px] md:p-3 w-full md:w-4/5' style={{ boxShadow: '0px 8px 10px 8px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Email:</p>
                            <Input placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border-[1px] border-black text-[16px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>How can we help you:</p>
                            <Textarea placeholder='What can we help you with' value={message} onChange={(e) => setMessage(e.target.value)} className='w-full border-[1px] border-black text-[16px] h-[150px]' />
                        </div>
                        {!Loading && <Button onClick={handleEmail} className='my-5 bg-yellow-400 hover:bg-yellow-400 text-black w-2/5 text-center p-2 rounded-lg'>
                            <p className='font-semibold text-[16px]'>Submit</p>
                        </Button>}
                        {Loading && <Button disabled className='my-5 bg-yellow-400 hover:bg-yellow-400 text-black w-2/5 text-center p-2 rounded-lg'>
                            <p className='font-semibold text-[16px]'>Submitting...</p>
                        </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage