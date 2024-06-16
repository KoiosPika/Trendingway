'use client'

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SessionRevoked = () => {

    const router = useRouter();

    useEffect(() => {

        const timer = setTimeout(() => {
            router.replace('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div>
            <h1>Session Revoked</h1>
            <p>Your session has been revoked. Please log in again.</p>
            <button onClick={() => router.replace('/login')}>Go to Login</button>
        </div>
    )
}

export default SessionRevoked