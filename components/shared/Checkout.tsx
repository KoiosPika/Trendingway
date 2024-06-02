"use client"

import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ userId, amount }: { userId: string, amount: number }) => {
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
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
            <Button type="submit" role="link" size="lg" className='bg-white text-black font-semibold p-2 rounded-lg w-full hover:bg-yellow-400 h-[60px]'>
                <p className='font-bold text-[15px] md:text-[20px] text-black'>${amount}.00</p>
            </Button>
        </form>
    )
}

export default Checkout