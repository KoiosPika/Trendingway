import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import Image from 'next/image'
import { submitReviewRate } from '@/lib/actions/review.actions'
import { useRouter } from 'next/navigation'

const RatingDialog = ({ id }: { id: string }) => {

    const [rating, setRating] = useState(1)
    const router = useRouter()

    const handleRating = async () => {
        await submitReviewRate(id, rating);
        router.push('/profile')
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className='w-full flex justify-center items-center h-[50px]'>
                <div className='w-5/6 h-full bg-green-400 flex flex-row items-center justify-center gap-2 rounded-md hover:cursor-pointer'>
                    <Image src={'/icons/star-black.svg'} alt='star' height={15} width={15} />
                    <p className='py-1 rounded-md font-semibold'>Rate</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-black font-bold">Rate Review</p>
                        <AlertDialogCancel className="rounded-full bg-black text-white hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p className='bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold mr-auto ml-5'>Choose a rating</p>
                <div className='flex flex-row items-center w-full justify-center gap-2'>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Image
                            key={index}
                            className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]'
                            src={index < rating ? '/icons/star-yellow.svg' : '/icons/star-grey.svg'}
                            alt='star'
                            width={100}
                            height={100}
                            onClick={() => setRating(index + 1)}
                        />
                    ))}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleRating} className="bg-yellow-400 text-black font-semibold hover:bg-yellow-400">Rate</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RatingDialog