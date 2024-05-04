import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-t-lg flex h-[660px] w-[720px] flex-row justify-center items-center mt-3 p-3 md:w-4/5 bg-white'>
                        <iframe className='rounded-lg h-[640px] w-[360px] mr-auto' height={1000} width={1000} src="https://youtube.com/embed/Z-_lzX_jXDY?si=78Ruilahxj5JOjRM"></iframe>
                        <ScrollArea className='w-[400px] h-[640px] bg-white rounded-tr-lg rounded-br-lg flex flex-col items-center'>
                            <div className='mt-2 font-semibold text-center'>Review</div>
                            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Content</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                    </div>
                                </div>
                                <Input placeholder='Notes about content' className='w-4/5 border-2 border-black text-[16px]' />
                            </div>
                            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Brightness</p>
                                <div className='flex flex-row justify-around  my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                    </div>
                                </div>
                                <Input placeholder='Notes about brightness:' className='w-4/5 border-2 border-black' />
                            </div>
                            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Title & Description</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                    </div>
                                </div>
                                <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
                            </div>
                            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Hashtags</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                    </div>
                                </div>
                                <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
                            </div>
                            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Sound</p>
                                <div className='flex flex-row justify-around my-3'>
                                    <p className='mr-3 font-semibold my-2 bg-yellow-400 px-2 py-1 rounded-lg'>Rating</p>
                                    <div className='flex flex-row items-center w-full justify-center gap-2'>
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-yellow.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                        <Image src={'/icons/star-grey.svg'} alt='star' width={30} height={30} />
                                    </div>
                                </div>
                                <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
                            </div>
                            <div className='w-full mt-2 mb-5 flex flex-col items-center justify-center'>
                                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5 my-3'>Additional Notes</p>
                                <Input placeholder='Notes about hashtags:' className='w-4/5 border-2 border-black' />
                            </div>
                            <div className='w-full flex flex-row justify-center items-center text-center my-6'>
                                <div className='w-1/3 bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md'>
                                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                                    <p className='py-1 rounded-md font-semibold'>Submit</p>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                    <div className='w-4/5 py-2 px-4 bg-white flex items-center gap-2 rounded-b-lg'>
                        <Image src={'/images/pfp.png'} alt='pfp' className='h-[60px] w-[60px] border-2 border-green-400 rounded-full mb-auto' height={1000} width={1000} />
                        <div>
                            <div className='font-semibold flex items-center gap-2'>
                                <p className='text-[13px]'>Jane Doe</p>
                                <p className='text-[12px] text-slate-400'>2h ago</p>
                            </div>
                            <div className='bg-gray-300 p-1 rounded-r-lg rounded-bl-lg'>
                                <p className='text-[13px]'>Hello, I'm not getting any views can you help me?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page