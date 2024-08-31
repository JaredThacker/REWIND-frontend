export interface VideoSnippet {
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  channelTitle: string;
}

export interface VideoItem {
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistic;
}

export interface VideoStatistic{
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoListResponse {
  items: VideoItem[];
}
