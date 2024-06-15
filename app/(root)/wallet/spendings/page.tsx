import SpendingOrders from '@/components/shared/SpendingOrder';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <SpendingOrders userId={userId} />
    )
}

export default page