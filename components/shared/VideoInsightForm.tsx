import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { useRouter } from 'next/navigation'
import { getUploadUrl } from '@/lib/actions/mux.actions'
import MuxUploader, { MuxUploaderDrop, MuxUploaderFileSelect, MuxUploaderProgress } from '@mux/mux-uploader-react';

const VideoInsightForm = ({ height, id, insighter, user }: { height: number, id: string, insighter: string, user: string }) => {

    const [uploadURL, setUploadURL] = useState<string>()
    const router = useRouter();

    useEffect(() => {
        async function getURL() {
            const thisURL = await getUploadUrl(id, user, insighter, 'VideoInsight')

            setUploadURL(thisURL)
        }

        getURL();
    }, [])

    const submitVideoInsight = async (event: any) => {
        router.push('/notifications/orders')
    }

    return (
        <ScrollArea className={`w-[400px] h-full md:h-[${height}px] bg-white rounded-tr-lg rounded-br-lg flex-col items-center`}>
            <div className='max-w-[600px]'>
                <div className="p-4">
                    <h2 className="text-lg text-slate-800 mb-2 font-bold"></h2>
                    <MuxUploader onChunkSuccess={(event) => submitVideoInsight(event)} id="my-uploader" className="hidden" endpoint={uploadURL} />

                    <MuxUploaderDrop
                        id="my-uploader"
                        className="border-4 border-slate-200 rounded shadow mb-4"
                        overlay
                        overlayText="Let it go"
                    >
                        <span slot="heading" className="text-slate-600 text-xl mb-2">Drop your response video</span>
                        <span slot="separator" className="text-slate-400 text-sm italic">— or —</span>

                        <MuxUploaderFileSelect muxUploader="my-uploader">
                            <button
                                className="bg-yellow-400 hover:bg-yellow-400 my-2 px-4 py-2 rounded text-black font-semibold text-sm"
                            >
                                Select from a folder
                            </button>
                        </MuxUploaderFileSelect>
                    </MuxUploaderDrop>
                    <MuxUploaderProgress
                        type="bar"
                        muxUploader="my-uploader"
                        className="text-3xl text-orange-600 underline"
                    />
                </div>
            </div>
        </ScrollArea>
    )
}

export default VideoInsightForm