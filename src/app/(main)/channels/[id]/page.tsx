"use client";

import Loading from "@/app/(videoId)/loading";
import Thumbnail from "@/components/Thumbnail/Thumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchChannel, fetchChannelVideos } from "@/lib/api";
import { ChannelDetails, ChannelVideo } from "@/types/customTypes";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const ChannelId = () => {
  const { id } = useParams();

  const {
    data: channelDetails,
    error: channelDetailsError,
    isLoading: loadingChannelDetails,
  } = useSWR<ChannelDetails["items"]>(id ? `channelDetails/${id}` : null, () =>
    fetchChannel(id as string)
  );

  const {
    data: channelVideos,
    error: channelVideosError,
    isLoading: loadingChannelVideos,
  } = useSWR<ChannelVideo["items"]>(id ? `channelVideos/${id}` : null, () =>
    fetchChannelVideos(id as string)
  );

  return (
    <div className="mt-[-64px]">
      <div className="h-64 w-full mb-10 md:rounded-none rounded-none overflow-hidden">
        {channelDetails && (
          <Image
            src={channelDetails?.snippet.thumbnails.high.url}
            alt={channelDetails?.snippet.title}
            className="object-cover w-full h-full"
            width={600}
            height={300}
            priority
          />
        )}
      </div>
      <div className="mb-10 flex flex-col md:flex-row items-center space-x-5 px-3">
        <Avatar className="w-28 h-28">
          <AvatarImage
            src={channelDetails?.snippet.thumbnails.high.url}
            alt={channelDetails?.snippet.title}
          />
          <AvatarFallback>{channelDetails?.snippet.title}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold text-center md:text-left text-3xl md:text-5xl mb-2 mt-4 md:mt-0">
            {channelDetails?.snippet.title}
          </h2>
          <p className="flex items-center text-sm">
            {channelDetails?.snippet.customUrl}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap">
        {loadingChannelDetails ||
          (loadingChannelVideos &&
            Array(10)
              .fill(null)
              .map((i, idx) => <Loading key={idx} />))}

        {channelVideos?.map((video) => (
          <Thumbnail
            key={video.id}
            video={{
              id: video.snippet.resourceId.videoId,
              title: video.snippet.title,
              description: video.snippet.description,
              thumbnail: video.snippet.thumbnails.high.url,
              viewCount: "",
              publishedDate: video.snippet.publishedAt,
              channel: {
                channelId: video.snippet.channelId,
                channelTitle: video.snippet.channelTitle,
                channelImage: "",
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelId;
