import Image from 'next/image'
import React from 'react'

const loading = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <Image src={'/icons/spinner.svg'} alt='loading' height={40} width={40} className='animate-spin' />
                </div>
            </div>
        </div>
    )
}

export default loading