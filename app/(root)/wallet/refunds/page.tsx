import RefundOrders from '@/components/shared/RefundOrders';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <RefundOrders userId={userId} />
    )
}

export default page