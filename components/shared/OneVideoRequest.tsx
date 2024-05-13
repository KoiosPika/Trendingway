import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'

const OneVideoRequest = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className='bg-[#3A51AE] h-[320px] w-[290px] rounded-[8px] p-5 text-white flex flex-col items-center'>
                    <h4 className='text-[20px] font-semibold mb-3 bg-red-600 w-full text-center rounded-lg'>1 Video Review</h4>
                    <Image src={'/icons/reel.png'} className='h-[200px] w-[200px]' alt='icon' height={1000} width={1000} />
                    <div className='mt-auto bg-yellow-300 w-full text-center rounded-lg py-1 text-black font-semibold'>
                        <p>$0.99</p>
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-black border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white underline">Request Review</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                    <p className='font-semibold text-white text-[16px]'>Video URL</p>
                    <Input placeholder="Video URL" className="border-[1px] border-black" />
                    <p className='font-semibold text-white text-[16px]'>Choose a platform</p>
                    <div className='grid grid-cols-3 w-full gap-3 bg-white rounded-md font-semibold border-2 border-white'>
                        <p className='text-center p-2 bg-black text-white text-[13px] md:text-[16px] rounded-l-md'>Instagram</p>
                        <p className='text-center p-2 text-[13px] md:text-[16px] bg-white text-black'>Youtube</p>
                        <p className='text-center p-2 text-[13px] md:text-[16px] bg-white text-black'>Tiktok</p>
                    </div>
                    <p className='font-semibold text-white text-[16px]'>Description</p>
                    <Input placeholder='Describe the problem'/>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-white text-black font-semibold">Request for $0.99</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default OneVideoRequest