'use client'

import React, { useEffect, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { getUserbyUserId } from '@/lib/actions/user.actions'
import { editUserData, getUserDataByUserId } from '@/lib/actions/userData.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { Switch } from '../ui/switch'

const EditProfile = ({ userId }: { userId: string }) => {

    const router = useRouter()

    const [aboutMe, setAboutMe] = useState<string>('')
    const [link, setLink] = useState<string>('')

    const [TextReview, setTextReview] = useState<number>(0)
    const [TextReviewAvailability, setTextReviewAvailability] = useState<boolean>(true)

    const [LongTextReview, setLongTextReview] = useState<number>(0)
    const [LongTextReviewAvailability, setLongTextReviewAvailability] = useState<boolean>(true)

    const [VideoReview, setVideoReview] = useState<number>(0)
    const [VideoReviewAvailability, setVideoReviewAvailability] = useState<boolean>(true)

    const [LongVideoReview, setLongVideoReview] = useState<number>(0)
    const [LongVideoReviewAvailability, setLongVideoReviewAvailability] = useState<boolean>(true)

    const [TextProfileReview, setTextProfileReview] = useState<number>(0)
    const [TextProfileReviewAvailability, setTextProfileReviewAvailability] = useState<boolean>(true)

    const [VideoProfileReview, setVideoProfileReview] = useState<number>(0)
    const [VideoProfileReviewAvailability, setVideoProfileReviewAvailability] = useState<boolean>(true)

    const [language, setLanguage] = useState('')
    const [category, setCategory] = useState('')

    const [selectedLanguage, setSelectedLanguage] = useState<string[]>(['']);
    const [selectedCategory, setSelectedCategory] = useState<string[]>(['']);
    const [loading, setLoading] = useState(false)

    const enableSaving = TextReview >= 0.99 && VideoReview >= 1.99 && TextProfileReview >= 2.99 && VideoProfileReview >= 3.99;

    useEffect(() => {
        async function getUser() {
            const myUser: IUserData = await getUserDataByUserId(userId)
            setAboutMe(myUser.aboutMe);
            setLink(myUser.websiteLink);

            setTextReview(myUser.TextReview);
            setTextReviewAvailability(myUser.TextReviewAvailability);
            setVideoReview(myUser.VideoReview);
            setVideoReviewAvailability(myUser.VideoReviewAvailability);

            setLongTextReview(myUser.LongTextReview);
            setLongTextReviewAvailability(myUser.LongTextReviewAvailability);
            setLongVideoReview(myUser.LongVideoReview);
            setLongVideoReviewAvailability(myUser.LongVideoReviewAvailability);


            setTextProfileReview(myUser.TextProfileReview);
            setTextProfileReviewAvailability(myUser.TextProfileReviewAvailability);
            setVideoProfileReview(myUser.VideoProfileReview);
            setVideoProfileReviewAvailability(myUser.VideoProfileReviewAvailability);

            setSelectedCategory(myUser.categories);
            setSelectedLanguage(myUser.languages)
        }

        getUser();
    }, [])

    useEffect(() => {
        handleAddLanguage(language)
    }, [language])

    useEffect(() => {
        handleAddCategory(category)
        console.log(selectedCategory)
    }, [category])

    const handleSubmit = async () => {

        setLoading(true)

        const userData = {
            userId,
            aboutMe,
            link,
            TextReview,
            TextReviewAvailability,
            LongTextReview,
            LongTextReviewAvailability,
            VideoReview,
            VideoReviewAvailability,
            LongVideoReview,
            LongVideoReviewAvailability,
            TextProfileReview,
            TextProfileReviewAvailability,
            VideoProfileReview,
            VideoProfileReviewAvailability,
            languages: selectedLanguage,
            categories: selectedCategory
        }

        await editUserData(userData)

        setLoading(false)

        router.push(`/profile`)
    }

    const handleAddLanguage = (language: string) => {
        setSelectedLanguage((prevLanguages) => [...prevLanguages, language]);
    };

    const handleAddCategory = (category: string) => {
        setSelectedCategory((prevCategories) => [...prevCategories, category]);
    };

    const handleDeleteLangauge = (index: any) => {
        setSelectedLanguage(prevLanguages => prevLanguages.filter((_, i) => i !== index));
    }

    const handleDeleteCategories = (index: any) => {
        setSelectedCategory(prevCategories => prevCategories.filter((_, i) => i !== index));
    }

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='rounded-lg flex flex-col justify-center items-center my-3 p-3 w-full md:w-4/5 bg-white'>
                        <p className='text-[20px] font-bold px-4 py-2 rounded-lg text-black'>Edit Profile</p>
                        <div className='flex flex-col justify-center items-center w-full gap-3 my-3'>
                            <p className='font-semibold mr-auto bg-green-400 px-4 py-2 rounded-full text-[13px] md:text-[16px]'>About Me:</p>
                            <Textarea placeholder='Tell your customers about yourself' value={aboutMe} className='w-full border-2 border-black text-[14px] md:text-[16px] font-semibold' onChange={(e) => setAboutMe(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-full gap-3 my-3'>
                            <p className='font-semibold mr-auto bg-blue-400 px-4 py-2 rounded-full text-[13px] md:text-[16px]'>Personal Link:</p>
                            <Input placeholder='Paste your personal link here' value={link} className='w-full border-2 border-black text-[14px] md:text-[16px] font-semibold' onChange={(e) => setLink(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-full gap-3 my-3'>
                            <p className='font-bold mr-auto bg-orange-400 px-4 py-2 rounded-full text-[13px] md:text-[16px]'>Services:</p>
                            <p className='font-bold text-[22px] text-slate-600 mt-5'>--- Short Content ---</p>
                            <p className='font-bold text-[15px] text-slate-600 my-2'>(60 seconds and less)</p>
                            <div className='w-full flex flex-col gap-3'>
                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Text Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full relative'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: TextReview < 0.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={TextReview} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setTextReview(Number(e.target.value))} style={{ color: TextReview < 0.99 ? 'red' : 'black' }} />
                                        </div>
                                        {TextReview < 0.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 0.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-blue-700'>
                                        {TextReviewAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!TextReviewAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={TextReviewAvailability} onCheckedChange={setTextReviewAvailability} style={{ backgroundColor: 'blue' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-blue-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-blue-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${TextReview} x 80% = ${(TextReview*0.80).toFixed(2)} </p>
                                        </div>
                                    </div>

                                </div>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-red-500 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Video Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: VideoReview < 1.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={VideoReview} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setVideoReview(Number(e.target.value))} style={{ color: VideoReview < 1.99 ? 'red' : 'black' }} />
                                        </div>
                                        {VideoReview < 1.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px]  font-semibold text-red-500'>{`Price Can't be Bellow 1.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-red-600'>
                                        {VideoReviewAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!VideoReviewAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={VideoReviewAvailability} onCheckedChange={setVideoReviewAvailability} style={{ backgroundColor: 'red' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-red-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-red-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${VideoReview} x 80% = ${(VideoReview*0.80).toFixed(2)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center items-center w-full'>
                                    <p className='font-bold text-[22px] text-slate-600 mt-5'>--- Long Content ---</p>
                                    <p className='font-bold text-[15px] text-slate-600 my-2'>(Over 60 seconds)</p>
                                </div>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Long Text Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full relative'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: LongTextReview < 0.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={LongTextReview} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setLongTextReview(Number(e.target.value))} style={{ color: LongTextReview < 0.99 ? 'red' : 'black' }} />
                                        </div>
                                        {LongTextReview < 0.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 0.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-purple-700'>
                                        {LongTextReviewAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!LongTextReviewAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={LongTextReviewAvailability} onCheckedChange={setLongTextReviewAvailability} style={{ backgroundColor: 'purple', opacity:0.75 }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-purple-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-purple-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${LongTextReview} x 80% = ${(LongTextReview*0.80).toFixed(2)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-[#B69615] w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Long Video Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: LongVideoReview < 1.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={LongVideoReview} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setLongVideoReview(Number(e.target.value))} style={{ color: LongVideoReview < 1.99 ? 'red' : 'black' }} />
                                        </div>
                                        {LongVideoReview < 1.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px]  font-semibold text-red-500'>{`Price Can't be Bellow 1.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-[#B69615]'>
                                        {LongVideoReviewAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!LongVideoReviewAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={LongVideoReviewAvailability} onCheckedChange={setLongVideoReviewAvailability} style={{ backgroundColor: '#B69615' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-[#B69615] rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-[#B69615] rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${LongVideoReview} x 80% = ${(LongVideoReview*0.80).toFixed(2)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center items-center w-full'>
                                    <p className='font-bold text-[22px] text-slate-600 my-5'>--- Account Auditing ---</p>
                                </div>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Text Profile Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: TextProfileReview < 2.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={TextProfileReview} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setTextProfileReview(Number(e.target.value))} style={{ color: TextProfileReview < 2.99 ? 'red' : 'black' }} />
                                        </div>
                                        {TextProfileReview < 2.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 2.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-[#DF7110]'>
                                        {TextProfileReviewAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!TextProfileReviewAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={TextProfileReviewAvailability} onCheckedChange={setTextProfileReviewAvailability} style={{ backgroundColor: '#DF7110' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-orange-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-orange-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${TextProfileReview} x 80% = ${(TextProfileReview*0.80).toFixed(2)} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/video-icon.svg'} alt='video' width={200} height={200} className='bg-green-700 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Video Profile Review</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: VideoProfileReview < 3.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={VideoProfileReview} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setVideoProfileReview(Number(e.target.value))} style={{ color: VideoProfileReview < 3.99 ? 'red' : 'black' }} />
                                        </div>
                                        {VideoProfileReview < 3.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 3.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-green-700'>
                                        {VideoProfileReviewAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!VideoProfileReviewAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={VideoProfileReviewAvailability} onCheckedChange={setVideoProfileReviewAvailability} style={{ backgroundColor: 'green' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-green-700 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-green-700 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${VideoProfileReview} x 80% = ${(VideoProfileReview*0.80).toFixed(2)} </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p className='font-bold mr-auto mt-4 bg-yellow-400 px-4 py-2 rounded-full'>Tags:</p>
                            <div className='flex justify-around items-center py-2 px-3 w-full gap-3 text-black text-[12px] md:text-[16px]'>
                                <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md w-2/4'>
                                    <Select onValueChange={setLanguage}>
                                        <SelectTrigger className="text-[12px] sm:text-[15px] broder-2 border-black flex justify-center items-center">
                                            <SelectValue placeholder="Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Afrikaans">Afrikaans</SelectItem>
                                            <SelectItem value="Albanian">Albanian</SelectItem>
                                            <SelectItem value="Amharic">Amharic</SelectItem>
                                            <SelectItem value="Arabic">Arabic</SelectItem>
                                            <SelectItem value="Armenian">Armenian</SelectItem>
                                            <SelectItem value="Azerbaijani">Azerbaijani</SelectItem>
                                            <SelectItem value="Basque">Basque</SelectItem>
                                            <SelectItem value="Belarusian">Belarusian</SelectItem>
                                            <SelectItem value="Bengali">Bengali</SelectItem>
                                            <SelectItem value="Bosnian">Bosnian</SelectItem>
                                            <SelectItem value="Bulgarian">Bulgarian</SelectItem>
                                            <SelectItem value="Catalan">Catalan</SelectItem>
                                            <SelectItem value="Cebuano">Cebuano</SelectItem>
                                            <SelectItem value="Chichewa">Chichewa</SelectItem>
                                            <SelectItem value="Chinese">Chinese</SelectItem>
                                            <SelectItem value="Corsican">Corsican</SelectItem>
                                            <SelectItem value="Croatian">Croatian</SelectItem>
                                            <SelectItem value="Czech">Czech</SelectItem>
                                            <SelectItem value="Danish">Danish</SelectItem>
                                            <SelectItem value="Dutch">Dutch</SelectItem>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="Esperanto">Esperanto</SelectItem>
                                            <SelectItem value="Estonian">Estonian</SelectItem>
                                            <SelectItem value="Filipino">Filipino</SelectItem>
                                            <SelectItem value="Finnish">Finnish</SelectItem>
                                            <SelectItem value="French">French</SelectItem>
                                            <SelectItem value="Frisian">Frisian</SelectItem>
                                            <SelectItem value="Galician">Galician</SelectItem>
                                            <SelectItem value="Georgian">Georgian</SelectItem>
                                            <SelectItem value="German">German</SelectItem>
                                            <SelectItem value="Greek">Greek</SelectItem>
                                            <SelectItem value="Gujarati">Gujarati</SelectItem>
                                            <SelectItem value="Haitian Creole">Haitian Creole</SelectItem>
                                            <SelectItem value="Hausa">Hausa</SelectItem>
                                            <SelectItem value="Hawaiian">Hawaiian</SelectItem>
                                            <SelectItem value="Hebrew">Hebrew</SelectItem>
                                            <SelectItem value="Hindi">Hindi</SelectItem>
                                            <SelectItem value="Hmong">Hmong</SelectItem>
                                            <SelectItem value="Hungarian">Hungarian</SelectItem>
                                            <SelectItem value="Icelandic">Icelandic</SelectItem>
                                            <SelectItem value="Igbo">Igbo</SelectItem>
                                            <SelectItem value="Indonesian">Indonesian</SelectItem>
                                            <SelectItem value="Irish">Irish</SelectItem>
                                            <SelectItem value="Italian">Italian</SelectItem>
                                            <SelectItem value="Japanese">Japanese</SelectItem>
                                            <SelectItem value="Javanese">Javanese</SelectItem>
                                            <SelectItem value="Kannada">Kannada</SelectItem>
                                            <SelectItem value="Kazakh">Kazakh</SelectItem>
                                            <SelectItem value="Khmer">Khmer</SelectItem>
                                            <SelectItem value="Korean">Korean</SelectItem>
                                            <SelectItem value="Kurdish">Kurdish</SelectItem>
                                            <SelectItem value="Kyrgyz">Kyrgyz</SelectItem>
                                            <SelectItem value="Lao">Lao</SelectItem>
                                            <SelectItem value="Latin">Latin</SelectItem>
                                            <SelectItem value="Latvian">Latvian</SelectItem>
                                            <SelectItem value="Lithuanian">Lithuanian</SelectItem>
                                            <SelectItem value="Luxembourgish">Luxembourgish</SelectItem>
                                            <SelectItem value="Macedonian">Macedonian</SelectItem>
                                            <SelectItem value="Malagasy">Malagasy</SelectItem>
                                            <SelectItem value="Malay">Malay</SelectItem>
                                            <SelectItem value="Malayalam">Malayalam</SelectItem>
                                            <SelectItem value="Maltese">Maltese</SelectItem>
                                            <SelectItem value="Maori">Maori</SelectItem>
                                            <SelectItem value="Marathi">Marathi</SelectItem>
                                            <SelectItem value="Mongolian">Mongolian</SelectItem>
                                            <SelectItem value="Myanmar">Myanmar</SelectItem>
                                            <SelectItem value="Nepali">Nepali</SelectItem>
                                            <SelectItem value="Norwegian">Norwegian</SelectItem>
                                            <SelectItem value="Pashto">Pashto</SelectItem>
                                            <SelectItem value="Persian">Persian</SelectItem>
                                            <SelectItem value="Polish">Polish</SelectItem>
                                            <SelectItem value="Portuguese">Portuguese</SelectItem>
                                            <SelectItem value="Punjabi">Punjabi</SelectItem>
                                            <SelectItem value="Romanian">Romanian</SelectItem>
                                            <SelectItem value="Russian">Russian</SelectItem>
                                            <SelectItem value="Samoan">Samoan</SelectItem>
                                            <SelectItem value="Scots Gaelic">Scots Gaelic</SelectItem>
                                            <SelectItem value="Serbian">Serbian</SelectItem>
                                            <SelectItem value="Sesotho">Sesotho</SelectItem>
                                            <SelectItem value="Shona">Shona</SelectItem>
                                            <SelectItem value="Sindhi">Sindhi</SelectItem>
                                            <SelectItem value="Sinhala">Sinhala</SelectItem>
                                            <SelectItem value="Slovak">Slovak</SelectItem>
                                            <SelectItem value="Slovenian">Slovenian</SelectItem>
                                            <SelectItem value="Somali">Somali</SelectItem>
                                            <SelectItem value="Spanish">Spanish</SelectItem>
                                            <SelectItem value="Sundanese">Sundanese</SelectItem>
                                            <SelectItem value="Swahili">Swahili</SelectItem>
                                            <SelectItem value="Swedish">Swedish</SelectItem>
                                            <SelectItem value="Tajik">Tajik</SelectItem>
                                            <SelectItem value="Tamil">Tamil</SelectItem>
                                            <SelectItem value="Telugu">Telugu</SelectItem>
                                            <SelectItem value="Thai">Thai</SelectItem>
                                            <SelectItem value="Turkish">Turkish</SelectItem>
                                            <SelectItem value="Ukrainian">Ukrainian</SelectItem>
                                            <SelectItem value="Urdu">Urdu</SelectItem>
                                            <SelectItem value="Uzbek">Uzbek</SelectItem>
                                            <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                                            <SelectItem value="Welsh">Welsh</SelectItem>
                                            <SelectItem value="Xhosa">Xhosa</SelectItem>
                                            <SelectItem value="Yiddish">Yiddish</SelectItem>
                                            <SelectItem value="Yoruba">Yoruba</SelectItem>
                                            <SelectItem value="Zulu">Zulu</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='bg-white text-black py-[3px] px-[5px] rounded-md w-2/4 font-bold'>
                                    <Select onValueChange={setCategory}>
                                        <SelectTrigger className="text-[12px] sm:text-[15px] font-semibold broder-2 border-black flex justify-center items-center">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Art">Art</SelectItem>
                                            <SelectItem value="Beauty">Beauty</SelectItem>
                                            <SelectItem value="Books">Books</SelectItem>
                                            <SelectItem value="Business">Business</SelectItem>
                                            <SelectItem value="Cars">Cars</SelectItem>
                                            <SelectItem value="Comedy">Comedy</SelectItem>
                                            <SelectItem value="Cooking">Cooking</SelectItem>
                                            <SelectItem value="Culture">Culture</SelectItem>
                                            <SelectItem value="Dancing">Dancing</SelectItem>
                                            <SelectItem value="DIY">DIY</SelectItem>
                                            <SelectItem value="Education">Education</SelectItem>
                                            <SelectItem value="Fashion">Fashion</SelectItem>
                                            <SelectItem value="Fitness">Fitness</SelectItem>
                                            <SelectItem value="Gaming">Gaming</SelectItem>
                                            <SelectItem value="Health">Health</SelectItem>
                                            <SelectItem value="History">History</SelectItem>
                                            <SelectItem value="Kids">Kids</SelectItem>
                                            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                            <SelectItem value="Motivation">Motivation</SelectItem>
                                            <SelectItem value="Movies">Movies</SelectItem>
                                            <SelectItem value="Music">Music</SelectItem>
                                            <SelectItem value="Nature">Nature</SelectItem>
                                            <SelectItem value="News">News</SelectItem>
                                            <SelectItem value="Nursing">Nursing</SelectItem>
                                            <SelectItem value="Parenting">Parenting</SelectItem>
                                            <SelectItem value="Pets">Pets</SelectItem>
                                            <SelectItem value="Plants">Plants</SelectItem>
                                            <SelectItem value="Pranks">Pranks</SelectItem>
                                            <SelectItem value="Programming">Programming</SelectItem>
                                            <SelectItem value="Queer">Queer</SelectItem>
                                            <SelectItem value="Relationships">Relationships</SelectItem>
                                            <SelectItem value="Self Care">Self Care</SelectItem>
                                            <SelectItem value="Sports">Sports</SelectItem>
                                            <SelectItem value="Storytelling">Storytelling</SelectItem>
                                            <SelectItem value="Travel">Travel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='flex w-full rounded-lg min-h-[50px] justify-center items-center flex-wrap gap-2 p-3 bg-slate-200'>
                                {selectedCategory.map((content, index) => (
                                    content &&
                                    <div key={index} className='flex flex-row items-center bg-green-200 border-[2px] border-green-600 rounded-lg px-3 py-2 gap-2'>
                                        <p onClick={() => handleDeleteCategories(index)} className='bg-red-600 px-1 md:px-2 text-white font-bold rounded-sm hover:cursor-pointer text-[12px] md:text-[16px]'>x</p>
                                        <p key={content} className=' text-green-600 font-bold text-[12px] md:text-[16px]'>{content}</p>
                                    </div>
                                ))}
                                {selectedLanguage.map((language, index) => (
                                    language &&
                                    <div key={index} className='flex flex-row items-center bg-orange-200 border-[2px] border-orange-600 rounded-lg px-3 py-2 gap-2'>
                                        <p onClick={() => handleDeleteLangauge(index)} className='bg-red-600 px-1 md:px-2 text-white font-bold rounded-sm hover:cursor-pointer text-[12px] md:text-[16px]'>x</p>
                                        <p key={language} className=' text-orange-600 font-bold text-[12px] md:text-[16px]'>{language}</p>
                                    </div>))}
                            </div>
                            {enableSaving &&
                                <Button disabled={loading} className='my-3 bg-green-700 p-3 rounded-lg hover:bg-green-700' onClick={handleSubmit}>
                                    <p className='font-semibold text-[15px] text-white'>Save Info</p>
                                </Button>}
                            {!enableSaving &&
                                <Button disabled={loading} className='my-3 bg-slate-400 p-3 rounded-lg disabled hover:cursor-default hover:bg-slate-400'>
                                    <p className='font-semibold text-[15px] text-white'>Save Info</p>
                                </Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile