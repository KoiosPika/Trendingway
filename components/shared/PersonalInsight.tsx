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

const PersonalInsight = ({ price, userId, insighter }: { price: number, userId: string, insighter: string }) => {

    const [description, setDescription] = useState<string>('')
    const [user, setUser] = useState<IUserData>()
    const [loading, setLoading] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const pathname = usePathname();

    const fetchUserData = async () => {
        const userData = await getUserDataByUserId(userId);
        setUser(userData);
    };

    useEffect(() => {
        fetchUserData();
    }, []);



    const handleRequest = async () => {
        if (loading || finished) {
            return;
        }

        setLoading(true);
        await fetchUserData();
        if (user && user?.creditBalance < price) {
            return;
        }

        await createPersonalRequest(userId, insighter, description, price, 'PersonalInsight');

        setLoading(false);
        setFinished(true);

    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                    <div className='flex justify-center items-center gap-8' >
                        <div className='flex flex-col items-center gap-2'>
                            <div className='bg-pink-500 w-[55px] h-[55px] p-2 rounded-full flex justify-center items-center'>
                                <Image src={'/icons/messages.svg'} alt='video' width={200} height={200} className='w-[50px] h-[50px] p-[1px]' />
                            </div>
                            <p className='font-semibold'>Personal Insight</p>
                        </div>
                        <div className='h-3/4 w-[2px] bg-black'></div>
                        <p className='text-[25px] font-semibold'>${price}</p>
                    </div>
                    <p className='mt-2 mx-2 p-2 bg-pink-500 rounded-lg text-white font-semibold'>Start a conversation with your Insighter by simply asking a question, which will open up a chat room where you can connect and interact with them</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-pink-500 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-black font-bold text-[18px] bg-yellow-300 px-3 rounded-md">Request Insight</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                    <p className='font-semibold text-white text-[16px]'>What would you like to know about me?</p>
                    <Textarea value={description} placeholder='Type your question here' onChange={(e) => setDescription(e.target.value)} className='text-[16px]' />
                </AlertDialogHeader>
                <SignedIn>
                    <AlertDialogFooter>
                        {user && (user.creditBalance < price) && (
                            <Button className='bg-red-700 hover:bg-red-700 hover:cursor-default' disabled>
                                Insufficient Funds
                            </Button>
                        )}
                        {user && (user.creditBalance >= price) && (
                            !finished ? (
                                <Button className="bg-white text-black font-semibold hover:bg-yellow-400" onClick={handleRequest} disabled={loading}>
                                    {loading ? 'Processing...' : `Request for $${price}`}
                                </Button>
                            ) : (
                                <Button className='bg-green-500' disabled>
                                    Finished
                                </Button>
                            )
                        )}
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