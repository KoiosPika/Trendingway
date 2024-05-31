import RechargeDialog from '@/components/shared/RechargeDialog';
import RechargeOrders from '@/components/shared/RechargeOrders';
import { getAllOrders } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { formatDate } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import React from 'react'

const page = () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <RechargeOrders userId={userId} />
    )
}

export default page