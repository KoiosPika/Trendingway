import ResponsePage from '@/components/shared/ResponsePage';
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {

    return (
        <ResponsePage id={id}/>
    )
}

export default page