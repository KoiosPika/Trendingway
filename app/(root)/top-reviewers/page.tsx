import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const page = () => {

    const rate = 3.5;
    const yellowStarsCount = Math.round(rate);
    const greyStarsCount = 5 - yellowStarsCount;
    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex justify-center items-center my-3 py-3 px-6 w-full gap-7 bg-white text-black text-[12px] md:text-[16px]'>
                        <div className='ml-auto bg-white text-black font-semibold py-[3px] px-[5px] rounded-md'>Category</div>
                        <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md'>Language</div>
                        <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md'>Sort By</div>
                    </div>
                    <div className='rounded-lg flex justify-center items-center my-3 py-3 px-6 w-11/12 gap-10 bg-white'>
                        <table className='w-full border-2 border-black rounded-lg'>
                            <thead className='text-center text-[12px] bg-black'>
                                <tr className='text-white'>
                                    <th className='md:text-[18px] p-3 md:font-semibold'>Rank</th>
                                    <th className='md:text-[18px] md:font-semibold'>Reviewer</th>
                                    <th className='md:text-[18px] md:font-semibold'>Rating</th>
                                </tr>
                            </thead>
                            <tbody className='text-[12px] text-center'>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>1</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>2</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>3</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <Link href={'/profile/rami'} className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>4</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>5</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='bg-gray-100 my-3'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>6</p>
                                    </td>
                                    <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                        <div className='flex flex-row items-center justify-center gap-3 h-8 w-7/8 '>
                                            <Image src={'/images/pfp.png'} alt='pfp' className='w-[20px] h-[20px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full' width={100} height={100} />
                                            <p className='truncate font-bold text-[10px] md:text-[13px] mr-auto'>Jane Doeeee</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-row items-center justify-center'>
                                            {Array.from({ length: yellowStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`yellow-${index}`}
                                                    src="/icons/star-yellow.svg"
                                                    alt="Yellow Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold'>(5.2k)</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page