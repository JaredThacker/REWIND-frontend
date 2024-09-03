// import React, { useEffect } from "react";

// //router
// import { useRouter } from 'next/router';
// import { API_KEY } from '../../data';
// import { get } from "http";

// //YouTube API
// const API_KEY:  '${API_KEY}';

// const VideoDisplay = () => {
//     const router = useRouter();
//     const { videoId } = router.query; //videoID URL
//     const [videoData, setVideoData] = useState(null);
    
//     return(

//     )
// }

// useEffect(() => {
//     if(videoId) {
//         axios get(`https://www.googleapis.com/youtube/v3/videos`), {
//             params: {
//                 part: 'snippet,contentDetails,statistics',
//                 id: videoId,
//                 key: 'AIzaSyBgjmgRuxcs0hMPE-YAwo328dxRO0LHESU',
//             },
//         })
//         .then(response => {
//             setVideoData(response.data.items[0]);
//         })
//         .catch(error => {
//             console.error('Error fetching video data, error');
//         });
//     }
// }, []


// //have to export