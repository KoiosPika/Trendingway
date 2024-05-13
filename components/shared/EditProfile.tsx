'use client'

import React, { useEffect, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { getUserbyUserId } from '@/lib/actions/user.actions'
import { editUserData, getUserDataByUserId } from '@/lib/actions/userData.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { Button } from '../ui/button'

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
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
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
                            <div className='flex flex-row w-full'>
                                <div className='bg-black text-white rounded-l-lg w-5/12 text-center flex justify-center items-center font-semibold'>1 Video Review</div>
                                <Input value={oneVideoPrice} className='border-2 border-black rounded-l-none font-semibold' type='number' onChange={(e) => setOneVideoPrice(Number(e.target.value))} />
                            </div>
                            {/* <div className='flex flex-row w-full'>
                                <div className='bg-black text-white rounded-l-lg w-5/12 text-center flex justify-center items-center font-semibold'>3 Video Review</div>
                                <Input defaultValue={user?.threeVideoPrice} className='border-2 border-black rounded-l-none font-semibold' />
                            </div>
                            <div className='flex flex-row w-full'>
                                <div className='bg-black text-white rounded-l-lg w-5/12 text-center flex justify-center items-center font-semibold'>Account Audit</div>
                                <Input defaultValue={user?.accountAuditPrice} className='border-2 border-black rounded-l-none font-semibold' />
                            </div> */}
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