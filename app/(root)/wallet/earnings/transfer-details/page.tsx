import TransfersPage from '@/components/shared/TransfersPage'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <TransfersPage userId={userId} />
    )
}

export default page