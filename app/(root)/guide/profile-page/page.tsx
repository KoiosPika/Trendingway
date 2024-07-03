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
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-3'>• From the displayed image, you can view your user profile picture, bio, and additional details of your account.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-3'>• Additionally, by clicking on the {`'Edit Profile'`} button, you will be directed to a page where you can update and personalize your profile information.</p>
                    <Image src={'/images/guide/profile/Profile_2.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• From this section, you have the option to modify your biography and include a personal link, allowing you to customize how others view your profile.</p>
                    <Image src={'/images/guide/profile/Profile_3.PNG'} alt='photo' height={2000} width={2000} className='md:w-3/4 my-5' />
                    <Image src={'/images/guide/profile/Profile_4.PNG'} alt='photo' height={2000} width={2000} className='md:w-3/4 mb-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• From this area, you can adjust the pricing of your services and view the anticipated earnings per order, enabling you to manage your offerings effectively.</p>
                    <p className='mr-auto font-bold text-[18px] ml-3 my-5 bg-yellow-400 px-2 py-1 rounded-md'>2. Services</p>
                    <Image src={'/images/guide/profile/Profile_5.PNG'} alt='photo' height={1500} width={1500} className='md:w-3/4 my-5' />
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-3'>• The services listed on your profile page are displayed as shown.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px] my-3'>• Clicking on any service will open a dialog with the request form right on the page, allowing customers to initiate service requests seamlessly without navigating away, streamlining the process.</p>
                    <div className='grid md:grid-cols-2 grid-cols-1 justify-center items-center md:gap-4'>
                        <Image src={'/images/guide/profile/Profile_6.PNG'} alt='photo' height={1500} width={1500} className='w-full my-5 rounded-md' />
                        <Image src={'/images/guide/profile/Profile_7.PNG'} alt='photo' height={1500} width={1500} className='w-full my-5 rounded-md' />
                    </div>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• Paste the link to your video (copied directly from a web browser, not the app), select the platform where your video is hosted, and describe how the Insighter can assist you.</p>
                    <p className='font-bold mr-auto ml-3 text-[12px] md:text-[16px]'>• For personal insights, you only need to write your question because {`it's chat based interface`}.</p>
                </div>
            </div>
        </div>
    )
}

export default page