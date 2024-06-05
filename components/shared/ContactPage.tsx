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
        // <div className='w-full h-full flex justify-center items-center bg-white'>
        //     <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
        //         <div className='my-3 justify-center items-center flex flex-col w-full'>
        //             <div className='rounded-lg flex flex-col justify-center items-center my-[50px] md:p-3 w-full md:w-4/5 bg-white md:border-[2px] border-slate-300' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
        //                 <div className='flex flex-row items-center text-black text-[35px] font-bold gap-1 py-2'>
        //                     <p>Contact Us</p>
        //                 </div>
        //                 <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
        //                     <p className='font-semibold mr-auto'>Email:</p>
        //                     <Input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border-2 border-black text-[16px]' />
        //                 </div>
        //                 <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
        //                     <p className='font-semibold mr-auto'>How can we help you:</p>
        //                     <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className='w-full border-2 border-black text-[16px] h-[150px]' />
        //                 </div>
        //                 {!Loading && <Button onClick={handleEmail} className='my-5 bg-yellow-400 hover:bg-yellow-400 text-black w-2/5 text-center p-2 rounded-lg'>
        //                     <p className='font-semibold text-[16px]'>Submit</p>
        //                 </Button>}
        //                 {Loading && <Button disabled className='my-5 bg-yellow-400 hover:bg-yellow-400 text-black w-2/5 text-center p-2 rounded-lg'>
        //                     <p className='font-semibold text-[16px]'>Submitting...</p>
        //                 </Button>}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='flex flex-col justify-center items-center w-full max-w-[600px]'>
            <p className='text-[17px] font-bold w-3/4'>A new response By ramimalass is available!</p>
            <a href={'/user'} className='flex flex-row items-center justify-center my-9 gap-5 px-4 py-6 rounded-lg' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                <Image className='w-[80px] h-[80px]' src={'/images/pfp.png'} alt='pfp' height={100} width={100} />
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className='flex flex-row items-center'>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                src={index < Math.ceil(3.6) ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                alt='star'
                                width={24}
                                height={24}
                            />
                        ))}
                        <p className='ml-2 text-black font-semibold'>(25)</p>
                    </div>
                    <div className='w-full h-[2px] bg-black mx-5' />
                    <div className='flex flex-row items-center gap-2'>
                        <p className='text-yellow-600 font-bold'>57</p>
                        <p className='text-black font-bold'>Reviews</p>
                    </div>
                </div>
            </a>
            <p className='w-3/4 text-slate-500'>From this moment, you have 72 hours to inform us if there's an issue with the response you received.</p>
            <a href={'/'} className='flex flex-row items-center justify-center px-3 py-2 bg-blue-500 my-3 rounded-lg gap-2'>
                <Image src={'/icons/star-white.svg'} alt='star' height={30} width={30}/>
                <p className='text-white font-bold'>Go to Text Review</p>
            </a>
        </div>
    )
}

export default ContactPage