import RechargeOrders from '@/components/shared/RechargeOrders';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <RechargeOrders userId={userId} />
    )
}

export default page