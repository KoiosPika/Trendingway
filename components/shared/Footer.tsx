import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#1A1A2E] text-white py-2 px-6"> {/* Use your brand colors */}
            <div className="max-w-7xl mx-auto flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col items-center md:items-start">
                <Image className='h-[45px] w-[45px] bg-black rounded-full' src={'/images/uncut.png'} alt='logo' height={1000} width={1000} />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 lg:gap-5 gap-2 text-center text-[10px] lg:text-[13px]">
                    <a href="/" className="hover:text-yellow-400 font-semibold">Home</a>
                    <a href="/profile" className="hover:text-yellow-400 font-semibold">Profile</a>
                    <a href="/wallet" className="hover:text-yellow-400 font-semibold">Wallet</a>
                    <a href="/privacy" className="hover:text-yellow-400 font-semibold">Privacy Policy</a>
                    <a href="/terms" className="hover:text-yellow-400 font-semibold">Terms of use</a>
                    <a href="/contact-us" className="hover:text-yellow-400 font-semibold">Contact Support</a>
                </div>
                <div className="justify-center mt-4 md:mt-0 hidden lg:block">
                    <Image src={'/images/qr code.PNG'} alt='qr_code' height={200} width={200} className='h-[45px] w-[45px]'/>
                </div>
            </div>
        </footer>
    )
}

export default Footer