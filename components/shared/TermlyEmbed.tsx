'use client'

import React, { createElement, useEffect } from 'react';

const TermlyEmbed = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.termly.io/embed-policy.min.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return createElement('div', {
        name: 'termly-embed',
        'data-id': '40086b9a-bf8d-4f4a-a71d-04ed26f3f206',
        'data-type': 'iframe'
    });
}

export default TermlyEmbed;
