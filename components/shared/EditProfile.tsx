'use client'

import React, { useEffect, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { getUserbyUserId } from '@/lib/actions/user.actions'
import { editUserData, getUserDataByUserId } from '@/lib/actions/userData.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { Button } from '../ui/button'
import Image from 'next/image'

const EditProfile = ({ userId }: { userId: string }) => {

    const [aboutMe, setAboutMe] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [oneVideoPrice, setOneVideoPrice] = useState<number>(0)

    useEffect(() => {
        async function getUser() {
            const myUser: IUserData = await getUserDataByUserId(userId)
            setAboutMe(myUser.aboutMe);
            setLink(myUser.websiteLink);
            setOneVideoPrice(myUser.oneVideoPrice);
        }

        getUser();
    }, [])

    const handleSubmit = async () => {
        await editUserData({ userId, aboutMe, link, oneVideoPrice })
    }


    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-4/5 bg-white'>
                        <p className='text-[20px] font-semibold bg-black px-4 py-2 rounded-lg text-white'>Edit Profile</p>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>About Me:</p>
                            <Textarea value={aboutMe} className='w-full border-2 border-black text-[16px]' onChange={(e) => setAboutMe(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Personal Link:</p>
                            <Input value={link} className='w-full border-2 border-black text-[16px]' onChange={(e) => setLink(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto'>Services:</p>
                            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-3'>
                                <div className='border-[1px] border-slate-300 rounded-lg h-[150px] flex justify-center items-center gap-2' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-blue-400 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Review one video</p>
                                    </div>
                                    <div className='h-3/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-row items-center justify-center flex-1 mr-auto'>
                                        <p className='text-[25px] font-semibold'>$</p>
                                        <Input value={oneVideoPrice} className='text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setOneVideoPrice(Number(e.target.value))} />
                                    </div>
                                </div>
                                <div className='border-[1px] border-slate-300 rounded-lg h-[150px] flex justify-center items-center gap-2' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-400 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Profile Audit</p>
                                    </div>
                                    <div className='h-3/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-row items-center justify-center flex-1 mr-auto'>
                                        <p className='text-[25px] font-semibold'>$</p>
                                        <Input value={oneVideoPrice} className='text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setOneVideoPrice(Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                            <Button className='my-3 bg-black p-3 rounded-lg' onClick={handleSubmit}>
                                <p className='font-semibold text-[15px] text-white'>Save Info</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile