import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#1A1A2E] text-white py-10 px-6"> {/* Use your brand colors */}
            <div className="max-w-7xl mx-auto flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col items-center md:items-start">
                <Image className='h-[60px] w-[60px] bg-[#fcd62e] rounded-full border-[2px] border-black' src={'/logo.png'} alt='logo' height={1000} width={1000} />
                </div>
                <div className="grid grid-cols-2 gap-5 text-center text-sm">
                    <a href="/" className="hover:text-gray-200">Home</a>
                    <a href="/privacy" className="hover:text-gray-200">Privacy Policy</a>
                    <a href="/pricing" className="hover:text-gray-200">Pricing</a>
                    <a href="/terms" className="hover:text-gray-200">Terms And Conditions</a>
                    <a href="/features" className="hover:text-gray-200">Features</a>
                    <a href="/support" className="hover:text-gray-200">Contact Support</a>
                </div>
                <div className="flex justify-center mt-4 md:mt-0">
                    <p className='text-black'>hello</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer