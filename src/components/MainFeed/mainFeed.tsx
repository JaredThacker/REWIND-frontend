"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_KEY } from "../../data";
import { VideoItem, VideoListResponse } from "./YoutubeAPIFeed";
import Image from "next/image";

const MainFeed: React.FC = () => {
  const [data, setData] = React.useState<VideoItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=1&regionCode=US&key=${API_KEY}`;
        const response = await fetch(videoListUrl);

        // TODO: Properly outline response FULLY to typescript type
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
    <div className="flex flex-wrap gap-4 p-4 mt-16">
      {data.map((item) => (
        <Link className="w-fit" href={`/video/${item.id}`} key={item.id}>
          <div className="shadow-lg h-56 w-56 rounded-xl relative group">
            <Image
              alt="random image"
              fill
              src={item.snippet.thumbnails.medium.url}
            />
            <div className="absolute inset-0 w-full h-full flex flex-col justify-around p-1">
              <div className="text-base text-center z-[1] text-black antialiased font-bold hidden relative group-hover:block">
                {item.snippet.title}
              </div>
              <div className="text-sm text-center z-[1] text-black antialiased font-bold hidden relative group-hover:block">
                {item.snippet.channelTitle}
              </div>
            </div>
            <div className="absolute inset-0 w-full h-full bg-gray-300 bg-opacity-0 group-hover:bg-opacity-[0.78] transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainFeed;
