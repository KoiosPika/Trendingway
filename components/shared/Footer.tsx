import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#1A1A2E] text-white py-2 px-6 flex justify-center items-center">
            <div className="flex md:flex-row flex-col items-center justify-center gap-7 w-full max-w-[800px]">
                <div className="text-[12px] lg:text-[13px] flex flex-row gap-7 mt-3 md:mt-0">
                    <a href="/" className="hover:text-yellow-400 font-semibold">Home</a>
                    <a href="/privacy" className="hover:text-yellow-400 font-semibold">Privacy Policy</a>
                    <a href="/terms" className="hover:text-yellow-400 font-semibold">Terms of Use</a>
                </div>
                <p className='font-semibold text-[13px]'>Contact: support@insightend.com</p>
            </div>
        </footer>
    )
}

export default Footer