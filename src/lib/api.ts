import { Video } from "@/types/YoutubeVideo";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchVideos(query: string, maxResult: number) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search?key=${API_KEY}&q=${query}&order=date&maxResults=${maxResult}&type=video&part=snippet`
    );

    console.log(data);

    const videos: Video[] = [];

    for (const video of data.items) {
      const videoId = video.id.videoId;
      const videoTitle = video.snippet.title;
      const videoDescription = video.snippet.videoDescription;
      const videoThumbnail = video.snippet.videoThumbnail.medium.url;

      const videoDetailsURL = `${BASE_URL}/videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`;
      const { data: videoData } = await axios.get(videoDetailsURL);

      const viewCount = videoData.items[0].statistics.viewCount;
      const channelId = video.snippet.channelId;

      const channelDetailsURL = `${BASE_URL}/channels?key=${API_KEY}&id=${channelId}&part=snippet`;

      const { data: channelData } = await axios.get(channelDetailsURL);

      const channelTitle = channelData.items[0].snippet.title;
      const channelImage = channelData.items[0].snippet.thumbnails.medium.url;

      const publishedDate = video.snippet.publishedAt;

      videos.push({
        id: videoId,
        title: videoTitle,
        description: videoDescription,
        thumbnail: videoThumbnail,
        viewCount,
        channel: {
          channelId,
          channelTitle,
          channelImage,
        },
        publishedDate,
      });
    }

    return videos;
  } catch (error: any) {
    console.log("Error fetching videos", error.response.data);
    throw error;
  }
}
