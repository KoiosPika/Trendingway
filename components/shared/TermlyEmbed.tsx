'use client'

import React, { createElement, useEffect } from 'react';

const TermlyEmbed = ({ type }: { type: 'Privacy' | 'Terms' }) => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.termly.io/embed-policy.min.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    if(type === 'Privacy'){
        return createElement('div', {
            name: 'termly-embed',
            'data-id': '40086b9a-bf8d-4f4a-a71d-04ed26f3f206',
            'data-type': 'iframe'
        });
    }

    if(type === 'Terms'){
        return createElement('div', {
            name: 'termly-embed',
            'data-id': '77a548be-f2ac-4747-bd9f-bdf576797393',
            'data-type': 'iframe'
        });
    }
}

export default TermlyEmbed;
