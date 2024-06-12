'use server'

import Mux from '@mux/mux-node'
import { v4 as uuidv4 } from 'uuid';

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function getUploadUrl(request: string, user: string, reviewer: string, type: string) {

    try {
        const upload = await mux.video.uploads.create({
            cors_origin: '*',
            new_asset_settings: {
                playback_policy: ["public"],
                passthrough: JSON.stringify({ request, user, reviewer, type })
            },
        })

        return (upload.url)
    } catch (error) {
        console.log(error)
    }
}