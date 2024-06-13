import EditProfile from '@/components/shared/EditProfile';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <EditProfile userId={userId}/>
    )
}

export default page