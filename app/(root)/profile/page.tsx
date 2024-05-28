import { Button } from '@/components/ui/button';
import { getUserbyUserId } from '@/lib/actions/user.actions';
import { getUserDataByUserId, getUserDataByUsername, getUsers } from '@/lib/actions/userData.actions';
import { IUserData } from '@/lib/database/models/userData.model';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import TextReview from '@/components/shared/TextReview';
import VideoReview from '@/components/shared/VideoReview';
import TextProfileReview from '@/components/shared/TextProfileReview';
import VideoProfileReview from '@/components/shared/VideoProfileReview';

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user: IUserData = await getUserDataByUserId(userId)

    const rate = user?.avgReview;
    const yellowStarsCount = Math.round(rate);
    const greyStarsCount = 5 - yellowStarsCount;

    const users = await getUsers();

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-2/3 bg-white'>
                        <div className='flex flex-col items-center gap-5'>
                            <div className='flex flex-row items-center gap-1'>
                                <p className='text-[20px] font-bold'>{user?.User?.username}</p>
                            </div>
                            <Image className='h-[200px] w-[200px] bg-white rounded-full border-2 border-slate-300' src={user?.User?.photo} alt='pfp' height={500} width={500} />
                            <div className='w-full flex flex-row'>
                                <div className='flex flex-row items-center'>
                                {Array.from({ length: 5 }, (_, index) => (
                                        <Image
                                            key={index}
                                            src={index < Math.ceil(user?.avgReview) ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                            alt='star'
                                            width={24}
                                            height={24}
                                        />
                                    ))}
                                    <p className='ml-2 text-black font-semibold'>({user?.nofReviews})</p>
                                    <div className='h-[25px] w-[2px] bg-black mx-5' />
                                    <div className='flex flex-row items-center gap-2'>
                                        <p className='text-yellow-600 font-bold'>{user?.nofVideoesReviewed}</p>
                                        <p className='text-black font-bold'>Reviews</p>
                                    </div>
                                </div>
                            </div>
                            <a href={user?.websiteLink} target='_blank' className='text-blue-600 hover:underline'>{user?.websiteLink}</a>
                        </div>
                        <div className='flex flex-col justify-center items-center md:flex-row w-full gap-2 my-3 text-black'>
                            <Link href={'/edit-profile'} className='bg-yellow-400 w-3/4 self-center flex justify-center items-center py-2 rounded-[10px] font-bold'>Edit Profile</Link>
                        </div>
                    </div>
                    <p className='mr-auto my-3 font-semibold text-[18px] ml-3'>Tags:</p>
                    <div className='mx-5 flex flex-row gap-3 w-full flex-wrap my-3 px-5'>
                        {user?.languages.map((language: any) => (
                            language && <p key={language} className='bg-orange-200 text-orange-600 px-3 py-2 rounded-lg font-semibold border-[2px] border-orange-600'>{language}</p>
                        ))}
                        {user?.categories.map((category: any) => (
                            category && <p key={category} className='bg-green-200 text-green-600 px-3 py-2 rounded-lg font-semibold border-[2px] border-green-600'>{category}</p>
                        ))}
                    </div>
                    <p className='mr-auto my-3 font-semibold text-[18px] ml-3'>About Me:</p>
                    <p className='mx-5'>{user?.aboutMe || `Hi I'm ${user?.User.username}`}</p>
                    <p className='mr-auto mt-10 mb-3 font-semibold text-[18px] ml-3'>Services by {user?.User?.username}: </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full'>
                        <TextReview price={user?.TextReview} userId={userId} reviewer={user?.User?._id} />
                        <VideoReview price={user?.VideoReview} userId={userId} reviewer={user?.User?._id} />
                        <TextProfileReview price={user?.TextProfileReview} userId={userId} reviewer={user?.User?._id} />
                        <VideoProfileReview price={user?.VideoProfileReview} userId={userId} reviewer={user?.User?._id} />
                    </div>
                    <div className='w-full my-3'>
                        <p className='mr-auto my-3 font-semibold text-[18px] ml-3'>Connect with other insighters:</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {users.map((user: IUserData) => (
                                <Link href={`/profile/${user?.User?.username}`} key={user._id} className='bg-white border-2 border-slate-200 rounded-lg flex flex-row justify-center items-center p-1 m-3' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col w-1/3 justify-center items-center'>
                                        <Image className='w-[100px] h-[100px] rounded-full my-2' src={user?.User?.photo} alt='pfp' height={300} width={300} />
                                        <div className='mx-3 flex flex-row'>
                                            <p className='font-bold md:text-[16px] text-[12px]'>{user?.User?.username}</p>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    className='h-[10px] w-[10px] md:h-[12px] md:w-[12px]'
                                                    src={index < Math.ceil(user?.avgReview) ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                    alt='star'
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                            <p className="text-[12px] mx-1 font-semibold">({user?.nofReviews})</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-2/3 gap-3'>
                                        <p className='font-semibold line-clamp-4 md:text-[14px] text-[12px]'>{user?.aboutMe}</p>
                                        <div className='flex flex-wrap gap-1'>
                                            {user?.categories.slice(0, 3).map((category: any, index) => (
                                                <p key={category} className='bg-green-200 text-green-600 px-3 py-2 rounded-lg font-bold border-[2px] border-green-600 text-[10px] lg:text-[12.5px]'>{category}</p>
                                            ))}
                                        </div>
                                    </div>
                                </Link>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page