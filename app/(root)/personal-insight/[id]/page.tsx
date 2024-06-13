import PersonalInsightPage from '@/components/shared/PersonalInsightPage'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <PersonalInsightPage id={id} userId={userId} />
  )
}

export default page