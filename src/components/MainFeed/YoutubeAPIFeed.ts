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
}

export interface VideoListResponse {
  items: VideoItem[];
}
