import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[1100px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center mt-3 mb-[100px] p-3 w-full lg:w-11/12 bg-white'>
                        <div className='w-full md:w-11/12 px-2 py-4 md:p-8 my-3 rounded-lg bg-yellow-400 text-black' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <div className='inline-flex justify-center items-center gap-2 ml-5 md:ml-0'>
                                <Image src={'/icons/book-black.svg'} className='h-[20px] w-[20px] md:h-[30px] md:w-[30px]' alt='guide' height={30} width={30} />
                                <p className='font-bold text-[18px] md:text-[21px] text-black'>Full Guide</p>
                            </div>
                            <div className='flex flex-col mt-3 ml-3 font-semibold gap-1'>
                                <p className='text-[15px] bg-black text-white px-1 text-center rounded-lg w-[180px]'>Note from the creator:</p>
                                <p className='text-[13.5px]'>While navigating the website guide, please be aware that the site has been crafted to enable Insighters to offer their services for as low as $0.99. This design is intended to streamline and enhance the experience for those requesting the services as well. </p>
                            </div>
                            <div className='inline-flex justify-center items-center gap-2 ml-5 md:ml-0 mt-5'>
                                <Image src={'/icons/book-black.svg'} className='h-[20px] w-[20px] md:h-[30px] md:w-[30px]' alt='guide' height={30} width={30} />
                                <p className='font-bold text-[18px] md:text-[21px] text-black'>Pages</p>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-2 gap-3'>
                                <div className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2'>
                                    <Image src={'/icons/user.svg'} alt='user' height={40} width={40}/>
                                    <p className='mt-2 font-bold'>Profile Page</p>
                                </div>
                                <div className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2'>
                                    <Image src={'/icons/user.svg'} alt='user' height={40} width={40}/>
                                    <p className='mt-2 font-bold'>Profile Page</p>
                                </div>
                                <div className='flex flex-col justify-center items-center bg-white border-[2px] border-black rounded-lg py-2'>
                                    <Image src={'/icons/user.svg'} alt='user' height={40} width={40}/>
                                    <p className='mt-2 font-bold'>Profile Page</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page