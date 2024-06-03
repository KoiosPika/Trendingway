'use client'

import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { createRequest } from '@/lib/actions/request.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { getUserDataByUserId } from '@/lib/actions/userData.actions'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

const VideoProfileReview = ({ price, userId, reviewer }: { price: number, userId: string, reviewer: string }) => {

    const [platform, setPlatform] = useState<string>('Instagram')
    const [URL, setURL] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [user, setUser] = useState<IUserData>()
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

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
        if(user && user?.creditBalance < price){
            return;
        }

        try {
            await createRequest({ User: userId, Reviewer: reviewer, postLink: URL, description, platform, price, type: 'VideoProfileReview' });

            setLoading(false);
            setFinished(true);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px]' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                    <div className='flex justify-center items-center gap-8' >
                        <div className='flex flex-col items-center gap-2'>
                            <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-600 w-[55px] h-[55px] p-2 rounded-full' />
                            <p className='font-semibold'>Video Profile Review</p>
                        </div>
                        <div className='h-3/4 w-[2px] bg-black'></div>
                        <p className='text-[25px] font-semibold'>${price}</p>
                    </div>
                    <p className='mt-2 mx-2 p-2 bg-green-600 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about your account and what can be improved to get more audience</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-green-700 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-black font-bold text-[18px] bg-yellow-300 px-3 rounded-md">Request Review</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                    <p className='font-semibold text-white text-[16px]'>Video URL</p>
                    <div className='flex flex-row'>
                        <Input value={URL} placeholder="Video URL" onChange={(e) => setURL(e.target.value)} />
                        <div className="relative inline-block w-[25px]">
                            <button
                                onClick={handleClick}
                                className="px-2 py-2 text-yellow-300 rounded"
                            >
                                <span className="px-2 border-[3px] border-yellow-300 rounded-full font-bold">i</span>
                            </button>
                            {isVisible && (
                                <div className="absolute w-[200px] bottom-[-25px] h-[90px] transform -translate-x-full mt-2 p-2 bg-black text-white text-[14px] rounded-lg border shadow-lg">
                                    <div className="flex items-center justify-center w-full">
                                        Copy and paste the link of the video from the web browser not the app
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className='font-semibold text-white text-[16px]'>Choose a platform</p>
                    <div className='grid grid-cols-3 w-full gap-3 bg-white rounded-md font-semibold border-2 border-white'>
                        <p
                            style={{ backgroundColor: platform === 'Instagram' ? 'black' : 'white', color: platform === 'Instagram' ? 'white' : 'black' }}
                            className='text-center p-2 text-[13px] md:text-[16px] rounded-l-md hover:cursor-pointer' onClick={() => setPlatform('Instagram')}>Instagram</p>
                        <p
                            style={{ backgroundColor: platform === 'Youtube' ? 'black' : 'white', color: platform === 'Youtube' ? 'white' : 'black' }}
                            className='text-center p-2 text-[13px] md:text-[16px] hover:cursor-pointer' onClick={() => setPlatform('Youtube')}>Youtube</p>
                        <p
                            style={{ backgroundColor: platform === 'TikTok' ? 'black' : 'white', color: platform === 'TikTok' ? 'white' : 'black' }}
                            className='text-center p-2 text-[13px] md:text-[16px] rounded-r-md hover:cursor-pointer' onClick={() => setPlatform('TikTok')}>Tiktok</p>
                    </div>
                    <p className='font-semibold text-white text-[16px]'>Description</p>
                    <Textarea value={description} placeholder='Describe the problem' onChange={(e) => setDescription(e.target.value)} />
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
                                <Button className='bg-green-600' disabled>
                                    Finished
                                </Button>
                            )
                        )}
                    </AlertDialogFooter>
                </SignedIn>
                <SignedOut>
                    <AlertDialogFooter>
                        <Link href={'/sign-in'} className='w-full'>
                            <Button className='bg-yellow-400 hover:bg-yellow-400 text-black font-bold w-full'>Sign In</Button>
                        </Link>
                    </AlertDialogFooter>
                </SignedOut>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VideoProfileReview