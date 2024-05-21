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

const EditProfile = ({ userId }: { userId: string }) => {

    const router = useRouter()

    const [aboutMe, setAboutMe] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [oneVideoPrice, setOneVideoPrice] = useState<number>(0)
    const [language, setLanguage] = useState('')
    const [category, setCategory] = useState('')

    const [selectedLanguage, setSelectedLanguage] = useState<string[]>(['']);
    const [selectedCategory, setSelectedCategory] = useState<string[]>(['']);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getUser() {
            const myUser: IUserData = await getUserDataByUserId(userId)
            setAboutMe(myUser.aboutMe);
            setLink(myUser.websiteLink);
            setOneVideoPrice(myUser.oneVideoPrice);
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

        await editUserData({ userId, aboutMe, link, oneVideoPrice, languages: selectedLanguage, categories: selectedCategory })

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
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto bg-green-400 px-4 py-2 rounded-full'>About Me:</p>
                            <Textarea value={aboutMe} className='w-full border-2 border-black text-[16px]' onChange={(e) => setAboutMe(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-semibold mr-auto bg-blue-400 px-4 py-2 rounded-full'>Personal Link:</p>
                            <Input value={link} className='w-full border-2 border-black text-[16px]' onChange={(e) => setLink(e.target.value)} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-4/5 gap-3 my-3'>
                            <p className='font-bold mr-auto bg-orange-400 px-4 py-2 rounded-full'>Services:</p>
                            <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-3'>
                                <div className='border-[1px] border-slate-300 rounded-lg h-[150px] flex justify-center items-center gap-2' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/video.svg'} alt='video' width={200} height={200} className='bg-blue-400 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Review one video</p>
                                    </div>
                                    <div className='h-3/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-row items-center justify-center flex-1 mr-auto'>
                                        <p className='text-[25px] font-semibold'>$</p>
                                        <Input value={oneVideoPrice} className='text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setOneVideoPrice(Number(e.target.value))} />
                                    </div>
                                </div>
                                <div className='border-[1px] border-slate-300 rounded-lg h-[150px] flex justify-center items-center gap-2' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                                    <div className='flex flex-col items-center gap-2 flex-1'>
                                        <Image src={'/icons/account.svg'} alt='video' width={200} height={200} className='bg-orange-400 w-[55px] h-[55px] p-2 rounded-full' />
                                        <p className='font-semibold'>Profile Audit</p>
                                    </div>
                                    <div className='h-3/4 w-[2px] bg-black'></div>
                                    <div className='flex flex-row items-center justify-center flex-1 mr-auto'>
                                        <p className='text-[25px] font-semibold'>$</p>
                                        <Input value={oneVideoPrice} className='text-[25px] font-semibold w-2/3 border-0' type='number' onChange={(e) => setOneVideoPrice(Number(e.target.value))} />
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
                                {selectedCategory.map((content,index) => (
                                    content &&
                                    <div key={index} className='flex flex-row items-center bg-green-200 border-[2px] border-green-600 rounded-lg px-3 py-2 gap-2'>
                                        <p key={content} className=' text-green-600 font-bold'>{content}</p>
                                        <p onClick={() => handleDeleteCategories(index)} className='bg-red-300 px-2 border-[1px] border-red-500 text-red-500 font-bold rounded-sm hover:cursor-pointer'>x</p>
                                    </div>
                                ))}
                                {selectedLanguage.map((language, index) => (
                                    language &&
                                    <div key={index} className='flex flex-row items-center bg-orange-200 border-[2px] border-orange-600 rounded-lg px-3 py-2 gap-2'>
                                        <p key={language} className=' text-orange-600 font-bold'>{language}</p>
                                        <p onClick={() => handleDeleteLangauge(index)} className='bg-red-300 px-2 border-[1px] border-red-500 text-red-500 font-bold rounded-sm hover:cursor-pointer'>x</p>
                                    </div>))}
                            </div>
                            <Button disabled={loading} className='my-3 bg-black p-3 rounded-lg' onClick={handleSubmit}>
                                <p className='font-semibold text-[15px] text-white'>Save Info</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile