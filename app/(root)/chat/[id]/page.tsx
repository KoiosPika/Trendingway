import ChatPage from '@/components/shared/ChatPage'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <ChatPage id={id} userId={userId}/>
  )
}

export default page