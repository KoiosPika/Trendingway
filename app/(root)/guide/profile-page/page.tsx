import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-11/12'>
                    <p className='font-bold text-[18px]'>Profile Page</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>1. Page Layout</p>
                    <Image src={'/images/guide/profile/Profile_1.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• From this image you can see your user image, bio and more.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• You can also click on Edit Profile button to get directed here:</p>
                    <Image src={'/images/guide/profile/Profile_2.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• From here you can edit your bio and add your personal link</p>
                    <Image src={'/images/guide/profile/Profile_3.PNG'} alt='photo' height={2000} width={2000} className='md:w-3/4 my-5' />
                    <Image src={'/images/guide/profile/Profile_4.PNG'} alt='photo' height={2000} width={2000} className='md:w-3/4 mb-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• And from here you can fix the pricing of your services and see expected earning per order</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Services</p>
                    <Image src={'/images/guide/profile/Profile_5.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• The Services on the profile page will appear like this</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• You can click on either one and it will bring out a request form</p>
                    <div className='grid md:grid-cols-2 grid-cols-1 justify-center items-center md:gap-4'>
                        <Image src={'/images/guide/profile/Profile_6.PNG'} alt='photo' height={1500} width={1500} className='w-full my-5 rounded-md' />
                        <Image src={'/images/guide/profile/Profile_7.PNG'} alt='photo' height={1500} width={1500} className='w-full my-5 rounded-md' />
                    </div>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• You can paste the link of your video (COPIED FROM WEB BROWSER NOT THE APP) and choose which platform your video is uploaded on and then describe what the insighter can help you with</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• For personal insights, you only need to write your question because {`it's chat base`}</p>
                </div>
            </div>
        </div>
    )
}

export default page