import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Profile Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5'>1. Page Layout</p>
                    <Image src={'/images/Screen1.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• From this image you can see your user image, bio and more.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• You can also click on Edit Profile button to get directed here:</p>
                    <Image src={'/images/Screen3.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• From here you can edit your bio and add your personal link</p>
                    <Image src={'/images/Screen4.PNG'} alt='photo' height={2000} width={2000} className='md:w-3/4' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• From here you can edit your bio and add your personal link</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5'>2. Services</p>
                    <Image src={'/images/Screen2.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4' />
                </div>
            </div>
        </div>
    )
}

export default page