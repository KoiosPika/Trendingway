import SearchUsername from "@/components/shared/SearchUsername"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getTopUsers } from "@/lib/actions/userData.actions"
import { IUserData } from "@/lib/database/models/userData.model"
import Image from "next/image"
import Link from "next/link"

import React from 'react'

const page = async () => {

  const users = await getTopUsers()

  return (
    <div className='w-full flex justify-center items-center bg-white'>
      <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
        <div className='my-3 justify-center items-center flex flex-col w-full'>
          <div className="flex w-full justify-center items-center mt-8 mb-3">
            <Image src={'/images/uncut.png'} alt="logo" className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]" height={1000} width={1000} />
          </div>
            <SearchUsername />  
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
