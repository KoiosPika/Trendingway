import OneVideoRequest from '@/components/shared/OneVideoRequest';
import { Button } from '@/components/ui/button';
import { getUserbyUserId } from '@/lib/actions/user.actions';
import { getUserDataByUserId, getUserDataByUsername } from '@/lib/actions/userData.actions';
import { IUserData } from '@/lib/database/models/userData.model';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const user = await getUserDataByUserId(userId)

    const rate = user.avgReview;
    const yellowStarsCount = Math.round(rate);
    const greyStarsCount = 5 - yellowStarsCount;

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0]

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-2/3 bg-white'>
                        <div className='flex flex-col items-center gap-5'>
                            <div className='flex flex-row items-center gap-1'>
                                <p className='text-[20px] font-semibold'>{user?.User?.username}</p>
                                <Image src={'/icons/verified.svg'} alt='verified' height={20} width={20} />
                            </div>
                            <Image className='h-[200px] w-[200px] bg-white rounded-full border-2 border-slate-300' src={user?.User?.photo} alt='pfp' height={500} width={500} />
                            <div className='flex flex-row items-center'>
                                {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                    <Image
                                        key={`yellow-${index}`}
                                        src="/icons/star-yellow.svg"
                                        alt="Yellow Star"
                                        width={24}
                                        height={24}
                                    />
                                ))}
                                {Array.from({ length: greyStarsCount }).map((_, index) => (
                                    <Image
                                        key={`grey-${index}`}
                                        src="/icons/star-grey.svg"
                                        alt="Grey Star"
                                        width={24}
                                        height={24}
                                    />
                                ))}
                                <p className='ml-2 text-black font-semibold'>({user.nofreviews})</p>
                            </div>
                            <a href={user.websiteLink} target='_blank' className='text-blue-600 hover:underline'>{user.websiteLink}</a>
                        </div>
                        <div className='flex flex-col md:flex-row w-full gap-2 my-3 text-black'>
                            <Link href={'/edit-profile'} className='bg-yellow-400 flex-1 flex justify-center items-center py-2 rounded-[20px] font-bold border-2 border-black'>Edit Profile</Link>
                        </div>
                    </div>
                    <p className='mr-auto my-3 font-semibold text-[18px] ml-3'>Tags:</p>
                    <div className='mx-5 flex flex-row gap-3 w-full flex-wrap my-3 px-5'>
                        {user.languages.map((language:any) => (
                            language && <p key={language} className='bg-orange-200 text-orange-600 px-3 py-2 rounded-lg font-semibold border-[2px] border-orange-600'>{language}</p>
                        ))}
                        {user.categories.map((category:any) => (
                            category && <p key={category} className='bg-green-200 text-green-600 px-3 py-2 rounded-lg font-semibold border-[2px] border-green-600'>{category}</p>
                        ))}
                    </div>
                    <p className='mr-auto my-3 font-semibold text-[18px] ml-3'>About Me:</p>
                    <p className='mx-5'>{user.aboutMe || `Hi I'm ${user?.User.username}`}</p>
                    <p className='mr-auto mt-10 mb-3 font-semibold text-[18px] ml-3'>Services by {user?.User?.username}: </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 px-3 w-full'>
                        <OneVideoRequest price={user.oneVideoPrice} userId={userId} reviewer={user.User._id} />
                        <div className='border-[1px] border-slate-300 rounded-lg h-[150px] flex justify-center items-center gap-8' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='flex flex-col items-center gap-2'>
                                <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-400 w-[55px] h-[55px] p-2 rounded-full' />
                                <p className='font-semibold'>Profile Audit</p>
                            </div>
                            <div className='h-3/4 w-[2px] bg-black'></div>
                            <p className='text-[25px] font-semibold'>$4.99</p>
                        </div>
                    </div>
                    <div className='w-full my-3'>
                        <p className='mr-auto my-3 font-semibold text-[18px] ml-3'>Connect with other influencers:</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {arr.map((_, index) => (
                                <div key={index} className='bg-white border-2 border-slate-200 rounded-lg py-3 flex flex-row justify-center items-center p-3 m-3' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col w-1/3 justify-center items-center'>
                                        <Image className='w-[100px] h-[100px] rounded-full my-2' src={'/images/pfp.png'} alt='pfp' height={300} width={300} />
                                        <div className='mx-3 flex flex-row'>
                                            <p className='font-semibold'>iamerika</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-2/3 gap-3'>
                                        <p> temporibus accusantium laboriosam et explicabo deserunt necessitatibus inventore fugiat saepe architecto placeat dolorem?</p>
                                        <div className=' grid grid-cols-3 gap-2'>
                                            <p className='bg-green-200 text-green-600 px-3 py-2 rounded-lg font-bold text-center border-[2px] border-green-600'>sport</p>
                                            <p className='bg-green-200 text-green-600 px-3 py-2 rounded-lg font-bold text-center border-[2px] border-green-600'>sport</p>
                                            <p className='bg-green-200 text-green-600 px-3 py-2 rounded-lg font-bold text-center border-[2px] border-green-600'>sport</p>
                                        </div>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page