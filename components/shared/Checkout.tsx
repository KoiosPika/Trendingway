"use client"

import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
import Image from 'next/image';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ userId, amount, coins }: { userId: string, amount: number, coins:number }) => {
    useEffect(() => {
        
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            
        }

        if (query.get('canceled')) {
            
        }
    }, []);

    const onCheckout = async () => {
        const order = {
            amount,
            User: userId
        }

        await checkoutOrder(order);
    }

    return (
        <form action={onCheckout}>
            <Button type="submit" role="link" size="lg" className='bg-white text-black font-semibold p-2 flex flex-row items-center gap-2 rounded-lg w-full hover:bg-yellow-400 h-[48px]'>
                <p className='font-bold text-[15px] md:text-[20px] text-black'>${amount} +</p>
                <Image src={'/images/coin.png'} alt='coin-bg' height={200} width={200} className='h-[35px] w-[35px]'/>
                <p className='font-bold text-[15px] md:text-[20px] text-black'>x {coins}</p>

            </Button>
        </form>
    )
}

export default Checkout