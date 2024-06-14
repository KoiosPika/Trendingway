import { getPlaybackId } from '@/lib/actions/mux.actions'
import MuxPlayer from '@mux/mux-player-react'
import React, { useEffect, useState } from 'react'

const VideoMessage = ({videoID}:{videoID:string}) => {
    const [playbackId, setPlaybackId] = useState<string>()

    useEffect(()=>{
        async function getPlayback(){
            const id = await getPlaybackId(videoID)
            setPlaybackId(id)
        }

        getPlayback()
    },[])
    
    return (
        <MuxPlayer
            playbackId={playbackId}
            streamType="on-demand"
        />
    )
}

export default VideoMessage