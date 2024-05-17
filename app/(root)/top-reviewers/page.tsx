import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"


const page = () => {

    const rate = 3.5;
    const yellowStarsCount = Math.round(rate);
    const greyStarsCount = 5 - yellowStarsCount;

    const arr = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    return (
        <div className='w-full flex justify-center items-center bg-white h-full'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='flex justify-around items-center my-3 py-2 px-3 w-full gap-3 text-black text-[12px] md:text-[16px]'>
                        <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md w-2/4'>
                            <Select>
                                <SelectTrigger className="text-[12px] sm:text-[15px] broder-2 border-black flex justify-center items-center">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="af">Afrikaans</SelectItem>
                                    <SelectItem value="sq">Albanian</SelectItem>
                                    <SelectItem value="am">Amharic</SelectItem>
                                    <SelectItem value="ar">Arabic</SelectItem>
                                    <SelectItem value="hy">Armenian</SelectItem>
                                    <SelectItem value="az">Azerbaijani</SelectItem>
                                    <SelectItem value="eu">Basque</SelectItem>
                                    <SelectItem value="be">Belarusian</SelectItem>
                                    <SelectItem value="bn">Bengali</SelectItem>
                                    <SelectItem value="bs">Bosnian</SelectItem>
                                    <SelectItem value="bg">Bulgarian</SelectItem>
                                    <SelectItem value="ca">Catalan</SelectItem>
                                    <SelectItem value="ceb">Cebuano</SelectItem>
                                    <SelectItem value="ny">Chichewa</SelectItem>
                                    <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                                    <SelectItem value="zh-TW">Chinese (Traditional)</SelectItem>
                                    <SelectItem value="co">Corsican</SelectItem>
                                    <SelectItem value="hr">Croatian</SelectItem>
                                    <SelectItem value="cs">Czech</SelectItem>
                                    <SelectItem value="da">Danish</SelectItem>
                                    <SelectItem value="nl">Dutch</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="eo">Esperanto</SelectItem>
                                    <SelectItem value="et">Estonian</SelectItem>
                                    <SelectItem value="tl">Filipino</SelectItem>
                                    <SelectItem value="fi">Finnish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="fy">Frisian</SelectItem>
                                    <SelectItem value="gl">Galician</SelectItem>
                                    <SelectItem value="ka">Georgian</SelectItem>
                                    <SelectItem value="de">German</SelectItem>
                                    <SelectItem value="el">Greek</SelectItem>
                                    <SelectItem value="gu">Gujarati</SelectItem>
                                    <SelectItem value="ht">Haitian Creole</SelectItem>
                                    <SelectItem value="ha">Hausa</SelectItem>
                                    <SelectItem value="haw">Hawaiian</SelectItem>
                                    <SelectItem value="iw">Hebrew</SelectItem>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                    <SelectItem value="hmn">Hmong</SelectItem>
                                    <SelectItem value="hu">Hungarian</SelectItem>
                                    <SelectItem value="is">Icelandic</SelectItem>
                                    <SelectItem value="ig">Igbo</SelectItem>
                                    <SelectItem value="id">Indonesian</SelectItem>
                                    <SelectItem value="ga">Irish</SelectItem>
                                    <SelectItem value="it">Italian</SelectItem>
                                    <SelectItem value="ja">Japanese</SelectItem>
                                    <SelectItem value="jw">Javanese</SelectItem>
                                    <SelectItem value="kn">Kannada</SelectItem>
                                    <SelectItem value="kk">Kazakh</SelectItem>
                                    <SelectItem value="km">Khmer</SelectItem>
                                    <SelectItem value="ko">Korean</SelectItem>
                                    <SelectItem value="ku">Kurdish (Kurmanji)</SelectItem>
                                    <SelectItem value="ky">Kyrgyz</SelectItem>
                                    <SelectItem value="lo">Lao</SelectItem>
                                    <SelectItem value="la">Latin</SelectItem>
                                    <SelectItem value="lv">Latvian</SelectItem>
                                    <SelectItem value="lt">Lithuanian</SelectItem>
                                    <SelectItem value="lb">Luxembourgish</SelectItem>
                                    <SelectItem value="mk">Macedonian</SelectItem>
                                    <SelectItem value="mg">Malagasy</SelectItem>
                                    <SelectItem value="ms">Malay</SelectItem>
                                    <SelectItem value="ml">Malayalam</SelectItem>
                                    <SelectItem value="mt">Maltese</SelectItem>
                                    <SelectItem value="mi">Maori</SelectItem>
                                    <SelectItem value="mr">Marathi</SelectItem>
                                    <SelectItem value="mn">Mongolian</SelectItem>
                                    <SelectItem value="my">Myanmar (Burmese)</SelectItem>
                                    <SelectItem value="ne">Nepali</SelectItem>
                                    <SelectItem value="no">Norwegian</SelectItem>
                                    <SelectItem value="ps">Pashto</SelectItem>
                                    <SelectItem value="fa">Persian</SelectItem>
                                    <SelectItem value="pl">Polish</SelectItem>
                                    <SelectItem value="pt">Portuguese</SelectItem>
                                    <SelectItem value="pa">Punjabi</SelectItem>
                                    <SelectItem value="ro">Romanian</SelectItem>
                                    <SelectItem value="ru">Russian</SelectItem>
                                    <SelectItem value="sm">Samoan</SelectItem>
                                    <SelectItem value="gd">Scots Gaelic</SelectItem>
                                    <SelectItem value="sr">Serbian</SelectItem>
                                    <SelectItem value="st">Sesotho</SelectItem>
                                    <SelectItem value="sn">Shona</SelectItem>
                                    <SelectItem value="sd">Sindhi</SelectItem>
                                    <SelectItem value="si">Sinhala</SelectItem>
                                    <SelectItem value="sk">Slovak</SelectItem>
                                    <SelectItem value="sl">Slovenian</SelectItem>
                                    <SelectItem value="so">Somali</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="su">Sundanese</SelectItem>
                                    <SelectItem value="sw">Swahili</SelectItem>
                                    <SelectItem value="sv">Swedish</SelectItem>
                                    <SelectItem value="tg">Tajik</SelectItem>
                                    <SelectItem value="ta">Tamil</SelectItem>
                                    <SelectItem value="te">Telugu</SelectItem>
                                    <SelectItem value="th">Thai</SelectItem>
                                    <SelectItem value="tr">Turkish</SelectItem>
                                    <SelectItem value="uk">Ukrainian</SelectItem>
                                    <SelectItem value="ur">Urdu</SelectItem>
                                    <SelectItem value="uz">Uzbek</SelectItem>
                                    <SelectItem value="vi">Vietnamese</SelectItem>
                                    <SelectItem value="cy">Welsh</SelectItem>
                                    <SelectItem value="xh">Xhosa</SelectItem>
                                    <SelectItem value="yi">Yiddish</SelectItem>
                                    <SelectItem value="yo">Yoruba</SelectItem>
                                    <SelectItem value="zu">Zulu</SelectItem>

                                </SelectContent>
                            </Select>
                        </div>
                        <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md w-2/4'>
                            <Select>
                                <SelectTrigger className="text-[12px] sm:text-[15px] font-semibold broder-2 border-black flex justify-center items-center">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="art">Art</SelectItem>
                                    <SelectItem value="beauty">Beauty</SelectItem>
                                    <SelectItem value="books">Books</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="cars">Cars</SelectItem>
                                    <SelectItem value="comedy">Comedy</SelectItem>
                                    <SelectItem value="cooking">Cooking</SelectItem>
                                    <SelectItem value="culture">Culture</SelectItem>
                                    <SelectItem value="dancing">Dancing</SelectItem>
                                    <SelectItem value="diy">DIY</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                    <SelectItem value="fashion">Fashion</SelectItem>
                                    <SelectItem value="fitness">Fitness</SelectItem>
                                    <SelectItem value="gaming">Gaming</SelectItem>
                                    <SelectItem value="health">Health</SelectItem>
                                    <SelectItem value="history">History</SelectItem>
                                    <SelectItem value="kids">Kids</SelectItem>
                                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="motivation">Motivation</SelectItem>
                                    <SelectItem value="movies">Movies</SelectItem>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="nature">Nature</SelectItem>
                                    <SelectItem value="news">News</SelectItem>
                                    <SelectItem value="nursing">Nursing</SelectItem>
                                    <SelectItem value="parenting">Parenting</SelectItem>
                                    <SelectItem value="pets">Pets</SelectItem>
                                    <SelectItem value="plants">Plants</SelectItem>
                                    <SelectItem value="pranks">Pranks</SelectItem>
                                    <SelectItem value="programming">Programming</SelectItem>
                                    <SelectItem value="queer">Queer</SelectItem>
                                    <SelectItem value="relationships">Relationships</SelectItem>
                                    <SelectItem value="self_care">Self Care</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="storytelling">Storytelling</SelectItem>
                                    <SelectItem value="travel">Travel</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='bg-white text-black font-semibold py-[3px] px-[5px] rounded-md w-2/4'>
                            <Select>
                                <SelectTrigger className="text-[12px] sm:text-[15px] broder-2 border-black flex justify-center items-center">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="most reviews">Most Reviews</SelectItem>
                                    <SelectItem value="least reviews">Least Reviews</SelectItem>
                                    <SelectItem value="avg reviews">Avg. Rating</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-1/4 bg-black flex justify-center items-center py-2 rounded-lg'>
                            <Image src={'/icons/search.svg'} alt='search' width={20} height={20} />
                        </div>
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
                                {arr.map((_, index) => (
                                <tr key={index} className='bg-gray-200'>
                                    <td>
                                        <p className='md:text-[15px] md:font-bold'>{index + 1}</p>
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
                                                    width={100}
                                                    height={100}
                                                    className='h-[10px] w-[10px] md:h-[20px] md:w-[20px]'
                                                />
                                            ))}
                                            {Array.from({ length: greyStarsCount }).map((_, index) => (
                                                <Image
                                                    key={`grey-${index}`}
                                                    src="/icons/star-grey.svg"
                                                    alt="Grey Star"
                                                    height={100}
                                                    width={100}
                                                    className='h-[10px] w-[10px] md:h-[20px] md:w-[20px]'
                                                />
                                            ))}
                                            <p className='ml-2 text-black font-semibold text-[11px] md:text-[15px]'>(5.2k)</p>
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

export default page