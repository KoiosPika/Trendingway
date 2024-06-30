'use client'

import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { createPersonalRequest } from '@/lib/actions/request.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { getUserDataByUserId } from '@/lib/actions/userData.actions'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { IUserFinancials } from '@/lib/database/models/userFinancials.model'
import { getUserFinancials } from '@/lib/actions/userFinancials.actions'

const PersonalInsight = ({ price, userId, insighter }: { price: number, userId: string, insighter: string }) => {

    const [description, setDescription] = useState<string>('')
    const [user, setUser] = useState<IUserFinancials>()
    const [status, setStatus] = useState<'Ready' | 'Loading' | 'Error' | 'Success' | 'Limit'>('Ready')
    const pathname = usePathname();

    const fetchUserData = async () => {
        const userData = await getUserFinancials(userId);
        setUser(userData);
    };

    useEffect(() => {
        fetchUserData();
    }, []);



    const handleRequest = async () => {
        
        setStatus('Loading');
        await fetchUserData();
        if (user && user?.creditBalance < price) {
            return;
        }

        const response = await createPersonalRequest(userId, insighter, description, price, 'PersonalInsight');

        switch (response) {
            case 'Success':
                setStatus('Success')
                break;

            case 'Error':
                setStatus('Error')
                break;

            case 'Limit Reached':
                setStatus('Limit')
                break;
        
            default:
                break;
        }

    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                    <div className='flex justify-center items-center gap-8' >
                        <div className='flex flex-col items-center gap-2'>
                        <Image src={'/icons/question.svg'} alt='video' width={200} height={200} className='bg-pink-600 w-[55px] h-[55px] p-2 rounded-full' />
                            <p className='font-semibold'>Personal Insight</p>
                        </div>
                        <div className='h-3/4 w-[2px] bg-black'></div>
                        <p className='text-[25px] font-semibold'>${price}</p>
                    </div>
                    <p className='mt-2 mx-2 p-2 bg-pink-600 rounded-lg text-white font-semibold'>Start a conversation with your Insighter by simply asking a question, which will open up a chat room where you can connect and interact with them</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-pink-600 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-yellow-300 font-bold text-[18px] rounded-md">Request Insight</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                    <p className='font-semibold text-white text-[16px]'>What would you like to know about me?</p>
                    <Textarea value={description} placeholder='Type your question here' onChange={(e) => setDescription(e.target.value)} className='text-[16px]' />
                </AlertDialogHeader>
                <SignedIn>
                    <AlertDialogFooter>
                        {user && (user.creditBalance < price) && (
                            <Button className='bg-red-700 hover:bg-red-700 hover:cursor-default border-white border-[1px]'>
                            Insufficient Funds
                        </Button>
                        )}
                        {user && (user.creditBalance >= price) && <>
                            {status === 'Ready' &&
                                <Button className="bg-white text-black font-semibold hover:bg-yellow-400" onClick={handleRequest}>
                                    {`Request for $${price}`}
                                </Button>}
                            {status === 'Loading' &&
                                <Button className="bg-green-600 text-white font-semibold hover:bg-green-600">
                                    Processing...
                                </Button>}
                            {status === 'Success' &&
                                <Button className="bg-green-600 text-white font-semibold hover:bg-green-600">
                                    Request Submitted!
                                </Button>}
                            {status === 'Error' &&
                                <Button className="bg-red-600 text-white font-semibold hover:bg-red-600">
                                    Error! Try again
                                </Button>}
                            {status === 'Limit' &&
                                <Button className="bg-red-600 text-white font-semibold hover:bg-red-600">
                                    Request box full
                                </Button>}
                        </>}
                    </AlertDialogFooter>
                </SignedIn>
                <SignedOut>
                    <AlertDialogFooter>
                        <Link href={`/sign-in?redirectTo=${encodeURIComponent(pathname)}`} className='w-full'>
                            <Button className='bg-yellow-400 hover:bg-yellow-400 text-black font-bold w-full'>Sign In</Button>
                        </Link>
                    </AlertDialogFooter>
                </SignedOut>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PersonalInsight