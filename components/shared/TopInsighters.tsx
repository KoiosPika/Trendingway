'use client'

import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { getTopUsers, getTopUsersByConditions } from '@/lib/actions/userData.actions';
import { IUserData } from '@/lib/database/models/userData.model';

const TopInsighters = () => {

    const [users, setUsers] = useState<IUserData[]>()
    const [language, setLanguage] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function getUsers() {
            const resultUsers = await getTopUsers()

            setUsers(resultUsers)
        }

        getUsers()
    }, [])

    const handleSearch = async () => {
        const matchConditions: { languages?: string, categories?: string } = {};

        if (language) {
            matchConditions.languages = language;
        }
        if (category) {
            matchConditions.categories = category;
        }

        const filteredUsers = await getTopUsersByConditions(matchConditions);
        setUsers(filteredUsers);
    }

    return (
        <div className='w-full flex justify-center bg-white h-full'>
            <div className='w-full flex flex-col max-w-[900px] items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='flex justify-around items-center my-3 py-2 px-3 w-full gap-1 md:gap-3 text-black text-[12px] md:text-[16px]'>
                        <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md w-2/5'>
                            <Select onValueChange={setLanguage}>
                                <SelectTrigger className="text-[12px] sm:text-[15px] broder-[1px] border-slate-300 flex justify-center items-center" style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                        <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md w-2/5'>
                            <Select onValueChange={setCategory}>
                                <SelectTrigger className="text-[12px] sm:text-[15px] font-semibold broder-2 border-slate-300 flex justify-center items-center" style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
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
                        <div onClick={handleSearch} className='w-1/5 bg-yellow-400 flex justify-center items-center py-[10px] rounded-lg' style={{ boxShadow: '0 8px 10px -6px gray, -8px 8px 8px -6px gray, 8px 8px 8px -6px gray' }}>
                            <Image src={'/icons/search-black.svg'} alt='search' width={20} height={20} />
                        </div>
                    </div>
                    <div className='rounded-lg flex justify-center items-center my-3 py-3 px-2 w-full gap-10 bg-white'>
                        <table className='w-full rounded-lg'>
                            <thead className='text-center text-[12px] bg-yellow-400'>
                                <tr className='text-black w-full'>
                                    <th className='md:text-[18px] p-3 md:font-bold w-1/6'>Rank</th>
                                    <th className='md:text-[18px] md:font-bold w-3/6'>Insighter</th>
                                    <th className='md:text-[18px] md:font-bold w-2/6'>Rating</th>
                                </tr>
                            </thead>
                            <tbody className='text-[12px] text-center'>
                                {users?.map((user: IUserData, index: any) => (
                                    <tr key={user?._id} style={{ backgroundColor: index % 2 == 0 ? '#E6E8E9' : 'white' }}>
                                        <td>
                                            <p className='md:text-[15px] font-bold'>{index + 1}</p>
                                        </td>
                                        <td className='flex justify-center items-center h-[35px] md:h-[60px]'>
                                            <Link href={`/profile/${user?.User?.username}`} className='flex flex-row items-center justify-center gap-2 h-8 w-7/8 '>
                                                <Image src={user?.User?.photo} alt='pfp' className='w-[25px] h-[25px] md:w-[45px] md:h-[45px] border-[1px] border-black rounded-full' width={100} height={100} />
                                                <p className='truncate font-bold text-[12px] md:text-[15px] mr-auto'>{user?.User?.username}</p>
                                            </Link>
                                        </td>
                                        <td>
                                            <div className='flex flex-row items-center justify-center'>
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <Image
                                                        key={index}
                                                        className='h-[11px] w-[11px] md:h-[20px] md:w-[20px]'
                                                        src={index < Math.ceil(user?.avgRating) ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                                                        alt='star'
                                                        width={100}
                                                        height={100}
                                                    />
                                                ))}
                                                <p className='ml-2 text-black font-semibold text-[9px] md:text-[15px]'>({user?.nofInsights})</p>
                                            </div>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TopInsighters