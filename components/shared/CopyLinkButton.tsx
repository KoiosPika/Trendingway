'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'

const CopyLinkButton = ({ username }: { username: string }) => {

    const [status, setStatus] = useState<'Ready' | 'Copied'>('Ready')

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://www.insightend.com/profile/${username}`).then(()=> {
            setStatus('Copied')

            setTimeout(() => {
                setStatus('Ready')
            }, 1000);
        })

    };

    return (
        <Button className='bg-blue-500 rounded-lg hover:bg-blue-500' onClick={copyToClipboard}>
            {status === 'Ready' && <Image src={'/icons/link-white.svg'} alt='link' height={20} width={20} />}
            {status === 'Copied' && <Image src={'/icons/check-white.svg'} alt='link' height={20} width={20} />}
        </Button>
    )
}

export default CopyLinkButton