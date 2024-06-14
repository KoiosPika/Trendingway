import PersonalInsightPage from '@/components/shared/PersonalInsightPage'
import { getRequestById } from '@/lib/actions/request.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const request = await getRequestById(id)

  return (
    <PersonalInsightPage id={id} userId={userId} user={request?.User?._id} />
  )

}

export default page