'use client';

import { useParams } from 'next/navigation';
const VideoDetails = () => {
    const  { id } = useParams();

    return ( <div>VideoDetails</div>
    )
}

export default VideoDetails;