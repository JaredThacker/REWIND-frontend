"use client";

import { fetchChannel, fetchChannelVideos } from "@/lib/api";
import { ChannelDetails, ChannelVideo } from "@/types/customTypes";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const ChannelId = () => {
  const { id } = useParams();

  const {
    data: channelDetails,
    error: channelDetailsError,
    isLoading: loadingChannelDetails,
  } = useSWR<ChannelDetails[]>(id ? `channelDetails/${id}` : null, () =>
    fetchChannel(id as string)
  );

  const {
    data: channelVideos,
    error: channelVideosError,
    isLoading: loadingChannelVideos,
  } = useSWR<ChannelVideo[]>(id ? `channelVideos/${id}` : null, () =>
    fetchChannelVideos(id as string)
  );

  return <div className="mt-[-64px]">Channels</div>;
};

export default ChannelId;
