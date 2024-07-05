import StagingPage from '@/components/shared/StagingPage'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <StagingPage />
                </div>
            </div>
        </div>
    )
}

export default page