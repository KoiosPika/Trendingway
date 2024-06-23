'use client'

import React, { useEffect, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
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

    const [VideoInsight, setVideoInsight] = useState<number>(0)
    const [VideoInsightAvailability, setVideoInsightAvailability] = useState<boolean>(true)

    const [LongVideoInsight, setLongVideoInsight] = useState<number>(0)
    const [LongVideoInsightAvailability, setLongVideoInsightAvailability] = useState<boolean>(true)

    const [PersonalInsight, setPersonalInsight] = useState<number>(0)
    const [PersonalInsightAvailability, setPersonalInsightAvailability] = useState<boolean>(true)

    const [ProfileInsight, setProfileInsight] = useState<number>(0)
    const [ProfileInsightAvailability, setProfileInsightAvailability] = useState<boolean>(true)

    const [language, setLanguage] = useState('')
    const [category, setCategory] = useState('')

    const [selectedLanguage, setSelectedLanguage] = useState<string[]>(['']);
    const [selectedCategory, setSelectedCategory] = useState<string[]>(['']);
    const [loading, setLoading] = useState(false)

    const enableSaving = VideoInsight >= 0.99 && LongVideoInsight >= 1.99 && ProfileInsight >= 2.99 && PersonalInsight >= 0.99;

    useEffect(() => {
        async function getUser() {
            const myUser: IUserData = await getUserDataByUserId(userId)
            setAboutMe(myUser.aboutMe);
            setLink(myUser.personalLink);

            setVideoInsight(myUser.VideoInsight);
            setVideoInsightAvailability(myUser.VideoInsightAvailability);

            setLongVideoInsight(myUser.LongVideoInsight);
            setLongVideoInsightAvailability(myUser.LongVideoInsightAvailability);

            setProfileInsight(myUser.ProfileInsight);
            setProfileInsightAvailability(myUser.ProfileInsightAvailability);

            setPersonalInsight(myUser.PersonalInsight);
            setPersonalInsightAvailability(myUser.PersonalInsightAvailability);

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
    }, [category])

    const handleSubmit = async () => {

        if (!enableSaving) {
            return;
        }

        setLoading(true)

        const userData = {
            userId,
            aboutMe,
            link,
            VideoInsight,
            VideoInsightAvailability,
            LongVideoInsight,
            LongVideoInsightAvailability,
            ProfileInsight,
            ProfileInsightAvailability,
            PersonalInsight,
            PersonalInsightAvailability,
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
                            <p className='mb-3 text-slate-500 font-bold text-[16px]'>--- Short Content Insight (Less than 60s) ---</p>
                            <div className='w-full flex flex-col gap-3'>
                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/star-white.svg'} alt='video' width={200} height={200} className='bg-blue-500 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Video Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full relative'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: VideoInsight < 0.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={VideoInsight} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setVideoInsight(Number(e.target.value))} style={{ color: VideoInsight < 0.99 ? 'red' : 'black' }} />
                                        </div>
                                        {VideoInsight < 0.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 0.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-blue-700'>
                                        {VideoInsightAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!VideoInsightAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={VideoInsightAvailability} onCheckedChange={setVideoInsightAvailability} style={{ backgroundColor: 'blue' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-blue-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-blue-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${VideoInsight} x 80% = ${(VideoInsight * 0.80).toFixed(2)} </p>
                                        </div>
                                    </div>

                                </div>

                                <p className='mb-3 text-slate-500 font-bold text-[16px] place-self-center'>--- Long Content Insight (More than 60s) ---</p>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-purple-500 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Long Text Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full relative'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: LongVideoInsight < 1.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={LongVideoInsight} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setLongVideoInsight(Number(e.target.value))} style={{ color: LongVideoInsight < 1.99 ? 'red' : 'black' }} />
                                        </div>
                                        {LongVideoInsight < 1.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 1.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-purple-700'>
                                        {LongVideoInsightAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!LongVideoInsightAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={LongVideoInsightAvailability} onCheckedChange={setLongVideoInsightAvailability} style={{ backgroundColor: 'purple', opacity: 0.75 }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-purple-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-purple-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${LongVideoInsight} x 80% = ${(LongVideoInsight * 0.80).toFixed(2)} </p>
                                        </div>
                                    </div>
                                </div>

                                <p className='mb-3 text-slate-500 font-bold text-[16px] place-self-center'>--- Profile Auditting Insight ---</p>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-500 w-[40px] h-[40px] md:w-[55px] md:h-[55px] p-1 md:p-2 rounded-full' />
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Profile Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: ProfileInsight < 2.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={ProfileInsight} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setProfileInsight(Number(e.target.value))} style={{ color: ProfileInsight < 2.99 ? 'red' : 'black' }} />
                                        </div>
                                        {ProfileInsight < 2.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 2.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-[#DF7110]'>
                                        {ProfileInsightAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!ProfileInsightAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={ProfileInsightAvailability} onCheckedChange={setProfileInsightAvailability} style={{ backgroundColor: '#DF7110' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-orange-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-orange-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${ProfileInsight} x 80% = ${(ProfileInsight * 0.80).toFixed(2)} </p>
                                        </div>
                                    </div>
                                </div>

                                <p className='mb-3 text-slate-500 font-bold text-[16px] place-self-center'>--- Personal Insight (Qs & As) ---</p>

                                <div className='border-[1px] border-slate-400 rounded-lg h-[150px] md:h-[180px] flex justify-center items-center gap-2 relative' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <div className='bg-pink-500 md:w-[55px] md:h-[55px] w-[40px] h-[40px] md:p-2 p-[6px] rounded-full flex justify-center items-center'>
                                            <Image src={'/icons/messages.svg'} alt='video' width={200} height={200} className='md:p-[1px]' />
                                        </div>
                                        <p className='font-semibold text-[13px] md:text-[16px]'>Text Personal Insight</p>
                                    </div>
                                    <div className='h-2/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-col items-center justify-center flex-1 mr-auto'>
                                        <div className='flex flex-row justify-center items-center w-full'>
                                            <p className='text-[20px] md:text-[25px] font-semibold' style={{ color: PersonalInsight < 0.99 ? 'red' : 'black' }}>$</p>
                                            <Input value={PersonalInsight} className='text-[20px] md:text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setPersonalInsight(Number(e.target.value))} style={{ color: PersonalInsight < 0.99 ? 'red' : 'black' }} />
                                        </div>
                                        {PersonalInsight < 0.99 && <p className='mt-[5px] md:mr-[100px] mr-auto text-[10px] md:text-[12px] font-semibold text-red-500'>{`Price Can't be Bellow 0.99`}</p>}
                                    </div>
                                    <div className='absolute top-1 right-2 flex flex-row items-center gap-2 text-pink-500'>
                                        {PersonalInsightAvailability && <p className='font-bold text-[12px]'>Service Available</p>}
                                        {!PersonalInsightAvailability && <p className='font-bold text-[12px]'>Service Unavailable</p>}
                                        <Switch checked={PersonalInsightAvailability} onCheckedChange={setPersonalInsightAvailability} style={{ backgroundColor: '#DD4EC9' }} />
                                    </div>
                                    <div className='absolute bottom-0 flex flex-row w-full'>
                                        <div className='flex w-1/2 h-[30px] bg-pink-500 rounded-bl-md justify-center items-center'>
                                            <p className='font-bold text-white text-[11px] md:text-[18px]'>Expected Earning Per 1 Order = </p>
                                        </div>
                                        <div className='flex w-1/2 h-[30px] bg-pink-500 rounded-br-md justify-center items-center'>
                                            <p className='font-bold text-white text-[13px] md:text-[18px]'>${PersonalInsight} x 80% = ${(PersonalInsight * 0.80).toFixed(2)} </p>
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