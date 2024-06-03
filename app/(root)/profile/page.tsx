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
import LongTextReview from '@/components/shared/LongTextReview';
import LongVideoReview from '@/components/shared/LongVideoReview';

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user: IUserData = await getUserDataByUserId(userId)

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
                            <a href={user?.websiteLink} target='_blank' className='text-blue-600 hover:underline font-semibold'>{user?.websiteLink}</a>
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
                    <p className='font-bold text-[22px] text-slate-600 mt-5'>--- Short Content ---</p>
                    <p className='font-bold text-[15px] text-slate-600 my-2'>(60 seconds and less)</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        {user?.TextReviewAvailability && <TextReview price={user?.TextReview} userId={userId} reviewer={user.User._id} />}
                        {!user?.TextReviewAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Text Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.TextReview}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-blue-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                        {user?.VideoReviewAvailability && <VideoReview price={user?.VideoReview} userId={userId} reviewer={user.User._id} />}
                        {!user?.VideoReviewAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Video Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.VideoReview}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-red-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                    </div>
                    <p className='font-bold text-[22px] text-slate-600 mt-5'>--- Long Content ---</p>
                    <p className='font-bold text-[15px] text-slate-600 my-2'>(Over 60 seconds)</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        {user?.LongTextReviewAvailability && <LongTextReview price={user?.LongTextReview} userId={userId} reviewer={user.User._id} />}
                        {!user?.LongTextReviewAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Long Text Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.TextReview}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-purple-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                        {user?.LongVideoReviewAvailability && <LongVideoReview price={user?.LongVideoReview} userId={userId} reviewer={user.User._id} />}
                        {!user?.LongVideoReviewAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#DB1E49] w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Long Video Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.VideoReview}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-[#DB1E49] rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                    </div>
                    <p className='font-bold text-[22px] text-slate-600 my-5'>--- Account Auditing ---</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        {user?.TextProfileReviewAvailability && <TextProfileReview price={user?.TextProfileReview} userId={userId} reviewer={user.User._id} />}
                        {!user?.TextProfileReviewAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Text Profile Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.TextProfileReview}</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-orange-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about your account and what can be improved to get more audience</p>
                            </div>}
                        {user?.VideoProfileReviewAvailability && <VideoProfileReview price={user?.VideoProfileReview} userId={userId} reviewer={user.User._id} />}
                        {!user?.VideoProfileReviewAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-600 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Video Profile Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.VideoProfileReview}</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-green-600 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about your account and what can be improved to get more audience</p>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page