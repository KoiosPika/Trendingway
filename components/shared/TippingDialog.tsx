import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { IUser } from '@/lib/database/models/user.model'
import Image from 'next/image'
import { Input } from '../ui/input'
import { getUserDataByUserId } from '@/lib/actions/userData.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { createTipping } from '@/lib/actions/tipping.actions'

const TippingDialog = ({ userId, reviewer }: { userId: string, reviewer: IUser }) => {

    const [user, setUser] = useState<IUserData>()
    const [tipAmount, setTipAmount] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [finished, setFinished] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUserData = async () => {
        const thisUser = await getUserDataByUserId(userId);
        setUser(thisUser);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleTip = async () => {
        if (loading || finished) {
            return;
        }

        setLoading(true); 
        await fetchUserData(); 
        if (user && user?.creditBalance >= tipAmount) {

            await createTipping(userId, reviewer?._id, tipAmount)
            console.log('Tipping process can proceed');
            setErrorMessage(null);

            
            setTimeout(() => {
                setLoading(false);
                setFinished(true);
            }, 2000); 
        } else {
            
            setErrorMessage(`You do not have sufficient balance to complete this tip. Current Balance: $ ${user?.creditBalance.toFixed(2)}`);
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex flex-row w-full justify-center items-center px-2 py-3 gap-2 bg-white text-black rounded-lg relative'>
                <Button className=' w-full h-[50px] flex justify-center items-center bg-blue-500 font-bold'>$ Tip</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-500 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <div className='flex flex-row items-center gap-3'>
                            <p className="text-white font-bold">Tip for</p>
                            <Image src={reviewer?.photo} alt='photo' height={100} width={100} className='h-[40px] w-[40px] rounded-full' />
                            <p className="text-white font-bold">{reviewer?.username}</p>
                        </div>
                        <AlertDialogCancel className="rounded-full bg-white text-blue-500 hover:bg-black hover:text-white">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className='flex flex-row items-center justify-center w-full gap-3 my-4'>
                    {[1, 5, 10, 20].map((amount) => (
                        <Button
                            key={amount}
                            className={`w-[60px] h-[40px] ${tipAmount === amount ? 'bg-yellow-400' : 'bg-white'} text-black font-bold rounded-lg hover:bg-yellow-400`}
                            onClick={() => setTipAmount(amount)}
                            disabled={loading || finished}
                        >
                            ${amount}
                        </Button>
                    ))}
                </div>
                {errorMessage && (
                    <div className='text-white bg-red-500 text-center rounded-md p-2 mt-2 font-bold'>
                        {errorMessage}
                    </div>
                )}
                {!finished ? (
                    <Button className='bg-yellow-500 place-self-center w-1/2 mt-4' onClick={handleTip} disabled={loading}>
                        {loading ? 'Processing...' : 'Tip'}
                    </Button>
                ) : (
                    <Button className='bg-gray-500 place-self-center w-1/2 mt-4' disabled>
                        Finished
                    </Button>
                )}
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default TippingDialog