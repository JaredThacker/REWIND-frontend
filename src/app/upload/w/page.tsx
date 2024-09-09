"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Player from "react-player";
import { fetchVideoDetails, fetchVideos } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCount } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import RelatedVideos from "@/components/RelatedVideos";
import { useRouter } from "next/navigation";
import UserCommentsDisplay from "@/components/Comments/userCommentsDisplay";
import PostCommentBox from "@/components/Comments/userPostComment";
import { UserComments } from "@/components/Comments/types";
import Loading from "@/app/(videoId)/loading";

const VideoDetails = () => {
  const { id } = useParams();
  const [commentBody, setCommentBody] = useState<UserComments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [substringCount, setSubstringCount] = useState<undefined | number>(200);

  const router = useRouter();

  const {
    data: videoDetails,
    isLoading: loadingVideoDetails,
    error: errorVideoDetails,
  } = useSWR(`/videoDetails/${id}`, () => fetchVideoDetails(id as string), {
    revalidateOnFocus: false,
  });

  const {
    data: relatedVideos,
    isLoading: loadingRelatedVideos,
    error: errorRelatedVideos,
  } = useSWR("/relatedVideos", () => fetchVideos("all", 5), {
    revalidateOnFocus: false,
  });

  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/comments`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: UserComments[] = await response.json();
        setCommentBody(data);
      } catch (error) {
        setError("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const addComment = (newComment: UserComments) => {
    setCommentBody((prevComments) => [...prevComments, newComment]);
  };

  if (errorVideoDetails || errorRelatedVideos) {
    throw new Error("Error fetching video data");
  }

  if (loadingVideoDetails || loadingRelatedVideos) return <Loading />;

  return (
    <div className="mb-9">
      <div className="px-4 h-[80vh] mt-14">
        <Player
          url={"https://rewinduploads.s3.amazonaws.com/Hurricane+Shaws+Final"}
          width="100%"
          height="100%"
          controls={true}
          muted={true}
        />
      </div>

      <div className="p-2 md:p-4 grid grid-cols-12 gap-7">
        <div className="md:col-span-8 col-span-12">
          <div>
            <h3 className="text-xl font-semibold">
              {"Hurricane Shaws Final.mp4"}
            </h3>
            <div className="flex justify-between my-3">
              <div className="space-x-3 flex">
                <Avatar>
                  <AvatarImage src="../../public/genericpfp.jpg" alt={"pfp"} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-gray-400 text-sm">Admin</h4>
                  <p className="text-gray-400 text-sm">0 subscribers</p>
                </div>
              </div>
              <div className="flex space-x-4 text-sm items-center bg-gray-600 text-white px-2 md:px-5 rounded-3xl">
                <button className="flex items-center space-x-2 hover:text-blue-500">
                  <ThumbsUp className="w-4" />
                  <span className="text-[9px]">0 Likes</span>
                </button>
                <span>|</span>
                <button className="flex items-center hover:text-red-500">
                  <ThumbsDown className="w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-3 bg-gray-600 text-white rounded-md my-4">
            <p className="leading-8">
              {/* {videoDetails?.description.substring(0, substringCount)}{" "} */}
              <span
                onClick={
                  substringCount === 200
                    ? () => setSubstringCount(undefined)
                    : () => setSubstringCount(200)
                }
                className="font-medium cursor-pointer text-sm underline text-blue-400"
              >
                {substringCount === 200 ? "load more" : "load less"}
              </span>
            </p>
          </div>
          <PostCommentBox onCommentPosted={addComment} />
          <UserCommentsDisplay
            comments={commentBody}
            loading={loading}
            error={error}
          />
        </div>

        <aside className="md:col-span-4 col-span-12">
          {relatedVideos?.map((video) => (
            <RelatedVideos key={video.id} video={video} />
          ))}
        </aside>
      </div>
    </div>
  );
};

export default VideoDetails;
