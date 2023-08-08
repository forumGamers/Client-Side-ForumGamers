"use client";

import { CardFooter } from "@/components/material-tailwind";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from "@/components/icon";
import { timeLine } from "@/interfaces/post";
import { CustomSession } from "@/interfaces/global";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LikeAPost, UnLikeAPost } from "@/actions/post";
import { experimental_useOptimistic as useOptimistic } from "react";

export default function PostCardFooter({
  timeLine,
  session,
}: {
  timeLine: timeLine;
  session: CustomSession | null;
}): JSX.Element {
  const router = useRouter();

  const [optimisticTimeLine, optimisticMutation] = useOptimistic(
    timeLine,
    (state, updatedField: { isLiked: boolean; CountLike: number }) => ({
      ...state,
      isLiked: updatedField.isLiked,
      CountLike: updatedField.CountLike,
    })
  );

  return (
    <>
      <CardFooter className="flex flex-row justify-between p-0">
        {/* Like button */}
        <button
          onClick={async () => {
            optimisticMutation({
              isLiked: !optimisticTimeLine.isLiked,
              CountLike: !optimisticTimeLine.isLiked
                ? optimisticTimeLine.CountLike + 1
                : optimisticTimeLine.CountLike - 1,
            });
            session?.user?.access_token
              ? !optimisticTimeLine.isLiked
                ? LikeAPost(timeLine._id).catch((err) => {
                    optimisticMutation({
                      isLiked: false,
                      CountLike: optimisticTimeLine.CountLike - 1,
                    });
                  })
                : UnLikeAPost(timeLine._id).catch((err) => {
                    optimisticMutation({
                      isLiked: true,
                      CountLike: optimisticTimeLine.CountLike + 1,
                    });
                  })
              : router.push("/login");
          }}
          className="btn btn-ghost gap-1 text-base"
        >
          <HeartIcon
            className={`h-6 w-6 text-pink-500 ${
              optimisticTimeLine?.isLiked
                ? "text-pink-500"
                : "text-transparent stroke-black"
            }`}
          />
          <span>Like</span>
        </button>
        {/* Comment button */}
        <Link
          className="btn btn-ghost gap-1 text-base"
          href={`/comment/${timeLine?._id}`}
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <span>Comment</span>
        </Link>

        {/* Send button */}
        <button className="btn btn-ghost gap-1 text-base">
          <PaperAirplaneIcon className="h-6 w-6" />
          <span>Send</span>
        </button>

        {/* Share button */}
        <button
          disabled={!session}
          onClick={() => {
            console.log("ok");
          }}
          className="btn btn-ghost gap-1 text-base"
        >
          <ShareIcon className="h-6 w-6" />
          <span>Share</span>
        </button>
      </CardFooter>
    </>
  );
}
