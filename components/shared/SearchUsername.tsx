'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { getUsersByUsername } from '@/lib/actions/user.actions'
import { IUser } from '@/lib/database/models/user.model'
import Link from 'next/link'
import Image from 'next/image'

const SearchUsername = () => {

    const [search, setSearch] = useState<string>('')
    const [users, setUsers] = useState<IUser[]>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        async function getUsers(search: string) {
            setLoading(true);
            const searchedUsers = await getUsersByUsername(search)

            setUsers(searchedUsers)
            setLoading(false)
        }

        if (search.length >= 3) {
            getUsers(search)
        }

        if (search.length < 3) {
            setUsers([])
        }
    }, [search])
    
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex flex-row items-center w-5/6 md:w-3/5 justify-center relative'>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for insighters" className="border-2 border-black w-full rounded-lg font-bold text-[16px] mb-1" />
                {loading && <Image src={'/icons/spinner.svg'} alt='loading' height={20} width={20} className='absolute right-2 animate-spin' />}
                {!loading && <Image src={'/icons/search-black.svg'} alt='loading' height={20} width={20} className='absolute right-2 top-3' />}
            </div>
            {(search.length >= 3 && users) && users.map((user: IUser) => (
                <Link key={user?._id} className='bg-slate-100 w-5/6 md:w-3/5 p-1 flex flex-row items-center' href={`/profile/${user?.username}`}>
                    <Image src={user?.photo} alt='photo' className='h-[35px] w-[35px] rounded-full' height={150} width={150} />
                    <p className='font-bold mx-2'>{user?.username}</p>
                </Link>
            ))}
        </div>
    )
}

export default SearchUsername