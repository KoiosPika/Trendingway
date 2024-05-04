import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const page = () => {

    const bio = `200k on Instagram
400k on TikTok
15k on Snapchat
will help you grow your account`;

    const rate = 3.5;
    const yellowStarsCount = Math.round(rate);
    const greyStarsCount = 5 - yellowStarsCount;

    const arr = [1, 2, 3];

    return (
        <div className='w-full flex justify-center items-center bg-white'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-2/3 bg-white'>
                        <div className='flex flex-col items-center gap-5'>
                            <div className='flex flex-row items-center gap-1'>
                                <p className='text-[20px] font-semibold'>Jane Doe</p>
                                <Image src={'/icons/verified.svg'} alt='verified' height={20} width={20} />
                            </div>
                            <Image className='h-[200px] w-[200px] bg-white rounded-full border-2 border-slate-300' src={'/images/pfp.png'} alt='pfp' height={500} width={500} />
                            <div className='flex flex-row items-center'>
                                {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                    <Image
                                        key={`yellow-${index}`}
                                        src="/icons/star-yellow.svg"
                                        alt="Yellow Star"
                                        width={24}
                                        height={24}
                                    />
                                ))}
                                {Array.from({ length: greyStarsCount }).map((_, index) => (
                                    <Image
                                        key={`grey-${index}`}
                                        src="/icons/star-grey.svg"
                                        alt="Grey Star"
                                        width={24}
                                        height={24}
                                    />
                                ))}
                                <p className='ml-2 text-black'>(233)</p>
                            </div>
                            <a>linktree.com</a>
                        </div>
                        <div className='flex flex-col md:flex-row w-full gap-2 my-3 text-white'>
                            <Link href={'/upload'} className='bg-black flex-1 flex justify-center items-center py-2 rounded-[10px] font-semibold'>Request Review</Link>
                            <Link href={'/edit-profile'} className='bg-black flex-1 flex justify-center items-center py-2 rounded-[10px] font-semibold'>Edit Profile</Link>
                        </div>
                    </div>
                    <p className='mr-auto my-3 font-semibold text-[18px] ml-3'>About Me:</p>
                    <p className='mx-5'>Hey My name is Robert Benjamin and my mission is simple. I want to help as many people as possible grow on TikTok, Instagram and YouTube.
                        I currently have the #1 YouTube channel for helping people grow on TikTok, Instagram and YouTube. Don’t believe me? Go search for TikTok Algorithm, Instagram Reels Algorithm, YouTube Shorts Algorithm and several more searches. </p>
                    <p className='mr-auto mb-3 mt-6 font-semibold text-[18px] ml-3'>Reviews from users:</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3'>
                        {arr.map((index) =>
                            <div className='bg-[#292929] h-[270px] w-[290px] rounded-[8px] p-5 text-white'>
                                <p className='h-[160px] overflow-hidden my-2'>
                                    "Instead of editing videos and posting regular videos, I now run a bunch
                                    of faceless short channels automated with ShortX, that rack up hundreds
                                    of subscribers per day."
                                </p>
                                <div className='flex flex-row items-center'>
                                    <Image className='w-[60px] h-[60px] p-1 rounded-full bg-[#6e44ff] mr-2' src={'/images/pfp.png'} alt="Avatar" width={200} height={200} />
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-[14px] font-semibold text-white'>Victoria</p>
                                        <div className='flex flex-row items-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={20}
                                                    height={20}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={20}
                                                    height={20}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                    <p className='mr-auto mt-10 mb-3 font-semibold text-[18px] ml-3'>Services by Jane Doe: </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3'>
                        <div className='bg-[#3A51AE] h-[320px] w-[290px] rounded-[8px] p-5 text-white flex flex-col items-center'>
                            <h4 className='text-[20px] font-semibold mb-3 bg-red-600 w-full text-center rounded-lg'>1 Video Review</h4>
                            <Image src={'/icons/reel.png'} className='h-[200px] w-[200px]' alt='icon' height={1000} width={1000} />
                            <div className='mt-auto bg-yellow-300 w-full text-center rounded-lg py-1 text-black font-semibold'>
                                <p>$0.99</p>
                            </div>
                        </div>
                        <div className='bg-[#3A51AE] h-[320px] w-[290px] rounded-[8px] p-5 text-white flex flex-col items-center'>
                            <h4 className='text-[20px] font-semibold mb-3 bg-red-600 w-full text-center rounded-lg'>3 Videos Review</h4>
                            <Image src={'/icons/reels.png'} className='h-[180px] w-[250px]' alt='icon' height={1000} width={1000} />
                            <div className='mt-auto bg-yellow-300 w-full text-center rounded-lg py-1 text-black font-semibold'>
                                <p>$3.99</p>
                            </div>
                        </div>
                        <div className='bg-[#3A51AE] h-[320px] w-[290px] rounded-[8px] p-5 text-white flex flex-col items-center'>
                            <h4 className='text-[20px] font-semibold mb-3 bg-red-600 w-full text-center rounded-lg'>Account Review</h4>
                            <Image src={'/icons/reel.png'} className='h-[200px] w-[200px]' alt='icon' height={1000} width={1000} />
                            <div className='mt-auto bg-yellow-300 w-full text-center rounded-lg py-1 text-black font-semibold'>
                                <p>$5.99</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default page