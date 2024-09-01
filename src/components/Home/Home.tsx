"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { fetchVideos } from "@/lib/api";
import Thumbnail from "../Thumbnail/Thumbnail";

export const Home = () => {
  const [badge, setBadge] = useState("all");
  const {
    data: videoResults,
    error,
    isLoading,
  } = useSWR(`fetchVideo/${badge}`, () => fetchVideos(badge, 9));

  console.log(videoResults);

  return (
    <>
      <div className="px-2 md:pl-[252px] fixed top-16 py-2 left-0 w-screen z-20 dark:bg-black bg-white">
        Search Badge
      </div>

      <div className="flex flex-wrap">
        {videoResults?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};
