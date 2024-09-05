"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_KEY } from "../../data";
import { VideoItem, VideoListResponse } from "./YoutubeAPIFeed";
import "./mainFeed.css";
import { truncateByWords, formatViews } from "./truncateViewAndTitle";

const MainFeed: React.FC = () => {
  const [data, setData] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${API_KEY}`;
        const response = await fetch(videoListUrl);
        const result: VideoListResponse = await response.json();
        setData(result.items);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="feed">
      {data.map((item) => (
        <Link href={`/watch/${item.id}`} key={item.id}>
          <div className="card glass">
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
            />
            <h2>{truncateByWords(item.snippet.title, 8)}</h2>
            <h4>
              {formatViews(parseInt(item.statistics.viewCount, 10))} views
            </h4>
            <h3>{item.snippet.channelTitle}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainFeed;
