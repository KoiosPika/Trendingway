import ResponsePage from '@/components/shared/ResponsePage';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <ResponsePage id={id} userId={userId}/>
    )
}

export default page