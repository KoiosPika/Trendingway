import TermlyEmbed from '@/components/shared/TermlyEmbed'
import React from 'react'

const page = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className='w-[900px] my-6 bg-yellow-300 md:rounded-lg px-3' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                <TermlyEmbed />
            </div>
        </div>
    )
}

export default page