import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#1A1A2E] text-white py-10 px-6"> {/* Use your brand colors */}
            <div className="max-w-7xl mx-auto flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col items-center md:items-start">
                <Image className='h-[70px] w-[70px] bg-black rounded-full border-[2px] border-[#fcd62e]' src={'/images/logoIcon.png'} alt='logo' height={1000} width={1000} />
                </div>
                <div className="grid grid-cols-2 gap-5 text-center text-sm">
                    <a href="/" className="hover:text-yellow-400 font-semibold">Home</a>
                    <a href="/privacy" className="hover:text-yellow-400 font-semibold">Privacy Policy</a>
                    <a href="/features" className="hover:text-yellow-400 font-semibold">Profile</a>
                    <a href="/terms" className="hover:text-yellow-400 font-semibold">Terms And Conditions</a>
                    <a href="/wallet" className="hover:text-yellow-400 font-semibold">Wallet</a>
                    <a href="/contact-us" className="hover:text-yellow-400 font-semibold">Contact Support</a>
                </div>
                <div className="flex justify-center mt-4 md:mt-0">
                    <Image src={'/images/qr code.PNG'} alt='qr_code' height={200} width={200} className='h-[75px] w-[75px]'/>
                </div>
            </div>
        </footer>
    )
}

export default Footer