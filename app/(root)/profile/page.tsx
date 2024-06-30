import LongRandomInsight from '@/components/shared/LongRandomInsight';
import LongVideoInsight from '@/components/shared/LongVideoInsight';
import RandomInsight from '@/components/shared/RandomInsight';
import PersonalInsight from '@/components/shared/PersonalInsight';
import ProfileInsight from '@/components/shared/ProfileInsight';
import VideoInsight from '@/components/shared/VideoInsight';
import { getUserDataByUserId } from '@/lib/actions/userData.actions';
import { IUserData } from '@/lib/database/models/userData.model';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user: IUserData = await getUserDataByUserId(userId)

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full relative'>
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
                                            src={index < Math.ceil(user?.avgRating) ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                            alt='star'
                                            width={24}
                                            height={24}
                                        />
                                    ))}
                                    <p className='ml-2 text-black font-semibold text-[18px]'>({user?.nofRatings})</p>
                                    <div className='h-[25px] w-[2px] bg-black mx-5' />
                                    <div className='flex flex-row items-center gap-2 text-[18px]'>
                                        <p className='text-yellow-600 font-bold'>{user?.nofVideoesInsighted}</p>
                                        <p className='text-black font-bold'>Insights</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <Image src={'/icons/link.svg'} alt='link' height={25} width={25} />
                                {user?.personalLink && <a href={user?.personalLink} target='_blank' className='text-blue-600 hover:underline font-semibold'>{user?.personalLink}</a>}
                                {!user?.personalLink && <p className='text-blue-600 hover:underline font-semibold'>No Link Added</p>}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center md:flex-row w-full gap-2 my-3 text-black'>
                            <Link href={'/edit-profile'} className='bg-yellow-400 w-3/4 self-center flex justify-center items-center py-2 rounded-[10px] font-bold'>Edit Profile</Link>
                        </div>
                    </div>
                    <p className='mr-auto my-3 font-semibold text-[14px] md:text-[18px] ml-3'>Tags:</p>
                    {(user?.languages.length > 0 || user?.categories.length > 0) && <div className='mx-5 flex flex-row gap-3 w-full flex-wrap my-3 px-5'>
                        {user?.languages.map((language: any) => (
                            language && <p key={language} className='bg-orange-200 text-orange-600 px-3 py-2 rounded-lg font-semibold border-[2px] border-orange-600 text-[14px] md:text-[16px]'>{language}</p>
                        ))}
                        {user?.categories.map((category: any) => (
                            category && <p key={category} className='bg-green-200 text-green-600 px-3 py-2 rounded-lg font-semibold border-[2px] border-green-600 text-[14px] md:text-[16px]'>{category}</p>
                        ))}
                    </div>}
                    {(user?.languages.length == 0 && user?.categories.length == 0) && <p className='font-semibold'>No Tags yet</p>}
                    <p className='mr-auto my-3 font-semibold text-[14px] md:text-[18px] ml-3'>About Me:</p>
                    <p className='mx-5 font-semibold md:text-[15px] text-[14px]'>{user?.aboutMe || `Hi I'm ${user?.User.username}`}</p>
                    <p className='mr-auto mt-10 mb-3 font-semibold text-[14px] md:text-[18px] ml-3'>Services by {user?.User?.username}: </p>
                    <div className='w-full bg-white gap-3 sticky top-0 z-10 grid md:grid-cols-4 grid-cols-2 p-2'>
                        <Link href={'#video-insight'} className='flex justify-center items-center p-2 rounded-lg bg-blue-600' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Video Insight</p>
                        </Link>
                        <Link href={'#profile-insight'} className='flex justify-center items-center p-2 rounded-lg bg-orange-600' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Profile Insight</p>
                        </Link>
                        <Link href={'#personal-insight'} className='flex justify-center items-center p-2 rounded-lg bg-pink-600' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Personal Insight</p>
                        </Link>
                        <Link href={'#random-insight'} className='flex justify-center items-center p-2 rounded-lg bg-green-700' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Random Insight</p>
                        </Link>
                    </div>
                    <div id='video-insight' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px] mt-5'>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-3 text-slate-500 font-bold text-[16px]'>--- Short Content Insight (60s Videos) ---</p>
                            {user?.VideoInsightAvailability && <VideoInsight price={user?.VideoInsight} userId={userId} insighter={user.User._id} />}
                            {!user?.VideoInsightAvailability &&
                                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex justify-center items-center gap-8' >
                                        <div className='flex flex-col items-center gap-2'>
                                            <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[55px] h-[55px] p-2 rounded-full' />
                                            <p className='font-semibold'>Text Insight</p>
                                        </div>
                                        <div className='h-2/4 w-[2px] bg-black'></div>
                                        <p className='text-[25px] font-semibold'>${user?.VideoInsight}</p>
                                    </div>
                                    <p className='mt-2 mx-2 p-2 bg-blue-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about the content, title, description, hashtags and more</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>}
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-3 text-slate-500 font-bold text-[16px]'>--- Long Content Insight (+60s Videos) ---</p>
                            {user?.LongVideoInsightAvailability && <LongVideoInsight price={user?.LongVideoInsight} userId={userId} insighter={user.User._id} />}
                            {!user?.LongVideoInsightAvailability &&
                                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex justify-center items-center gap-8' >
                                        <div className='flex flex-col items-center gap-2'>
                                            <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[55px] h-[55px] p-2 rounded-full' />
                                            <p className='font-semibold'>Long Text Insight</p>
                                        </div>
                                        <div className='h-2/4 w-[2px] bg-black'></div>
                                        <p className='text-[25px] font-semibold'>${user?.LongVideoInsight}</p>
                                    </div>
                                    <p className='mt-2 mx-2 p-2 bg-purple-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about the content, title, description, hashtags and more</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        <div id='profile-insight' className='flex flex-col justify-center items-center'>
                            <p className='mb-3 text-slate-500 font-bold text-[16px]'>--- Profile Auditting Insight ---</p>
                            {user?.ProfileInsightAvailability && <ProfileInsight price={user?.ProfileInsight} userId={userId} insighter={user.User._id} />}
                            {!user?.ProfileInsightAvailability &&
                                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex justify-center items-center gap-8' >
                                        <div className='flex flex-col items-center gap-2'>
                                            <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[55px] h-[55px] p-2 rounded-full' />
                                            <p className='font-semibold'>Profile Insight</p>
                                        </div>
                                        <div className='h-2/4 w-[2px] bg-black'></div>
                                        <p className='text-[25px] font-semibold'>${user?.ProfileInsight}</p>
                                        <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                            <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                            <p className='text-red-500 font-bold'>Unavailable</p>
                                        </div>
                                    </div>
                                    <p className='mt-2 mx-2 p-2 bg-orange-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about your account and what can be improved to attract more audience</p>
                                </div>}
                        </div>
                        <div id='personal-insight' className='flex flex-col justify-center items-center'>
                            <p className='mb-3 text-slate-500 font-bold text-[16px]'>--- Personal Insight (Qs & As) ---</p>
                            {user?.PersonalInsightAvailability && <PersonalInsight price={user?.PersonalInsight} userId={userId} insighter={user.User._id} />}
                            {!user?.PersonalInsightAvailability &&
                                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex justify-center items-center gap-8' >
                                        <div className='flex flex-col items-center gap-2'>
                                            <Image src={'/icons/s.svg'} alt='video' width={200} height={200} className='bg-pink-600 w-[55px] h-[55px] p-2 rounded-full' />
                                            <p className='font-semibold'>Personal Insight</p>
                                        </div>
                                        <div className='h-2/4 w-[2px] bg-black'></div>
                                        <p className='text-[25px] font-semibold'>${user?.PersonalInsight}</p>
                                        <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                            <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                            <p className='text-red-500 font-bold'>Unavailable</p>
                                        </div>
                                    </div>
                                    <p className='mt-2 mx-2 p-2 bg-pink-600 rounded-lg text-white font-semibold'>Start a conversation with your Insighter by simply asking a question, which will open up a chat room where you can connect and interact with them</p>
                                </div>}
                        </div>
                    </div>
                    <div id='random-insight' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-3 text-slate-500 font-bold text-[16px]'>--- Random Insight (60s Videos) ---</p>
                            {user?.RandomInsightAvailability && <RandomInsight price={user?.RandomInsight} userId={userId} insighter={user.User._id} />}
                            {!user?.RandomInsightAvailability &&
                                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex justify-center items-center gap-8' >
                                        <div className='flex flex-col items-center gap-2'>
                                            <Image src={'/icons/gavel.svg'} alt='video' width={200} height={200} className='bg-[#3b711e] w-[55px] h-[55px] p-2 rounded-full' />
                                            <p className='font-semibold'>Random Insight</p>
                                        </div>
                                        <div className='h-2/4 w-[2px] bg-black'></div>
                                        <p className='text-[25px] font-semibold'>${user?.RandomInsight}</p>
                                        <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                            <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                            <p className='text-red-500 font-bold'>Unavailable</p>
                                        </div>
                                    </div>
                                    <p className='mt-2 mx-2 p-2 bg-[#3b711e] rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about your account and what can be improved to attract more audience</p>
                                </div>}
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-3 text-slate-500 font-bold text-[16px]'>--- Long Random Insight (+60s Videos) ---</p>
                            {user?.LongRandomInsightAvailability && <LongRandomInsight price={user?.LongRandomInsight} userId={userId} insighter={user.User._id} />}
                            {!user?.LongRandomInsightAvailability &&
                                <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex justify-center items-center gap-8' >
                                        <div className='flex flex-col items-center gap-2'>
                                            <Image src={'/icons/feather.svg'} alt='video' width={200} height={200} className='bg-[#3e2ea3] w-[55px] h-[55px] p-2 rounded-full' />
                                            <p className='font-semibold'>Long Random Insight</p>
                                        </div>
                                        <div className='h-2/4 w-[2px] bg-black'></div>
                                        <p className='text-[25px] font-semibold'>${user?.LongRandomInsight}</p>
                                        <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                            <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                            <p className='text-red-500 font-bold'>Unavailable</p>
                                        </div>
                                    </div>
                                    <p className='mt-2 mx-2 p-2 bg-[#3e2ea3] rounded-lg text-white font-semibold'>Start a conversation with your Insighter by simply asking a question, which will open up a chat room where you can connect and interact with them</p>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page