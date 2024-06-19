import EarningOrders from '@/components/shared/EarningOrders'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <EarningOrders userId={userId} />
    )
}

export default page