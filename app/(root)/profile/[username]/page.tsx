import LongTextInsight from '@/components/shared/LongTextInsight';
import LongVideoInsight from '@/components/shared/LongVideoInsight';
import TextInsight from '@/components/shared/TextInsight';
import TextPersonalInsight from '@/components/shared/TextPersonalInsight';
import TextProfileInsight from '@/components/shared/TextProfileInsight';
import VideoInsight from '@/components/shared/VideoInsight';
import VideoPersonalInsight from '@/components/shared/VideoPersonalInsight';
import VideoProfileInsight from '@/components/shared/VideoProfileInsight';
import { getUserDataByUsername, getUsers } from '@/lib/actions/userData.actions';
import { IUserData } from '@/lib/database/models/userData.model';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const page = async ({ params: { username } }: { params: { username: string } }) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user: IUserData = await getUserDataByUsername(username)

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
                                    <p className='ml-2 text-black font-semibold'>({user?.nofInsights})</p>
                                    <div className='h-[25px] w-[2px] bg-black mx-5' />
                                    <div className='flex flex-row items-center gap-2'>
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
                        <Link href={'#short'} className='flex justify-center items-center p-2 rounded-lg bg-blue-500' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Short Content</p>
                        </Link>
                        <Link href={'#long'} className='flex justify-center items-center p-2 rounded-lg bg-purple-500' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Long Content</p>
                        </Link>
                        <Link href={'#audit'} className='flex justify-center items-center p-2 rounded-lg bg-orange-500' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Profile Audit</p>
                        </Link>
                        <Link href={'#personal'} className='flex justify-center items-center p-2 rounded-lg bg-yellow-500' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <p className='font-semibold text-white text-[13px] md:text-[16px]'>Personal Insight</p>
                        </Link>
                    </div>
                    <p id='short' className='font-bold text-[22px] text-slate-600 mt-5'>--- Short Content ---</p>
                    <p className='font-bold text-[15px] text-slate-600 my-2'>(60 seconds and less)</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        {user?.TextInsightAvailability && <TextInsight price={user?.TextInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.TextInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Text Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.TextInsight}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-blue-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                        {user?.VideoInsightAvailability && <VideoInsight price={user?.VideoInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.VideoInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Video Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.VideoInsight}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-red-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                    </div>
                    <p id='long' className='font-bold text-[22px] text-slate-600 mt-5'>--- Long Content ---</p>
                    <p className='font-bold text-[15px] text-slate-600 my-2'>(Over 60 seconds)</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        {user?.LongTextInsightAvailability && <LongTextInsight price={user?.LongTextInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.LongTextInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Long Text Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.TextInsight}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-purple-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                        {user?.LongVideoInsightAvailability && <LongVideoInsight price={user?.LongVideoInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.LongVideoInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#B69615] w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Long Video Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.VideoInsight}</p>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-[#B69615] rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about the content, title and description, hashtags and more</p>
                                <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                    <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                    <p className='text-red-500 font-bold'>Unavailable</p>
                                </div>
                            </div>}
                    </div>
                    <p id='audit' className='font-bold text-[22px] text-slate-600 my-5'>--- Account Auditing ---</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        {user?.TextProfileInsightAvailability && <TextProfileInsight price={user?.TextProfileInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.TextProfileInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Text Profile Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.TextProfileInsight}</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-orange-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about your account and what can be improved to get more audience</p>
                            </div>}
                        {user?.VideoProfileInsightAvailability && <VideoProfileInsight price={user?.VideoProfileInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.VideoProfileInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-600 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Video Profile Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.VideoProfileInsight}</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-green-700 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about your account and what can be improved to get more audience</p>
                            </div>
                        }
                    </div>
                    <p id='personal' className='font-bold text-[22px] text-slate-600 my-5'>--- Personal Insight ---</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full mb-[25px]'>
                        {user?.TextPersonalInsightAvailability && <TextPersonalInsight price={user?.TextPersonalInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.TextPersonalInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/people.svg'} alt='video' width={200} height={200} className='bg-pink-500 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Text Personal Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.TextPersonalInsight}</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-pink-500 rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get an insight about your account and what can be improved to get more audience</p>
                            </div>}
                        {user?.VideoPersonalInsightAvailability && <VideoPersonalInsight price={user?.VideoPersonalInsight} userId={userId} insighter={user.User._id} />}
                        {!user?.VideoPersonalInsightAvailability &&
                            <div className='flex flex-col justify-center items-center border-[1px] border-slate-300 rounded-lg h-[240px] md:h-[220px] bg-slate-200 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                <div className='flex justify-center items-center gap-8' >
                                    <div className='flex flex-col items-center gap-2'>
                                        <Image src={'/icons/selfie.svg'} alt='video' width={200} height={200} className='bg-[#b83c4c] w-[55px] h-[55px] p-[7px] rounded-full' />
                                        <p className='font-semibold'>Video Personal Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <p className='text-[25px] font-semibold'>${user?.VideoPersonalInsight}</p>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 bg-white px-2 border-[1px] border-red-500 rounded-lg'>
                                        <Image src={'/icons/unavailable.svg'} alt='unavailable' height={15} width={15} />
                                        <p className='text-red-500 font-bold'>Unavailable</p>
                                    </div>
                                </div>
                                <p className='mt-2 mx-2 p-2 bg-[#b83c4c] rounded-lg text-white font-semibold'>Upload a link to your TikTok, Reel or Short, and get a 60s video insight about your account and what can be improved to get more audience</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page