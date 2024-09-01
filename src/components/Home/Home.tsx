"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { fetchVideos } from "@/lib/api";

export const Home = () => {
  const [badge, setBadge] = useState("all");
  const {
    data: videoResults,
    error,
    isLoading,
  } = useSWR(`fetchVideo/${badge}`, () => fetchVideos("badge", 9));

  return <></>;
};
