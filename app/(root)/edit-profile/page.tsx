import EditProfile from '@/components/shared/EditProfile';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { getUserDataByUserId } from '@/lib/actions/userData.actions';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <EditProfile userId={userId}/>
    )
}

export default page