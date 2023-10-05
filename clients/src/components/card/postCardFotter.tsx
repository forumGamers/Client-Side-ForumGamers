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

export default function PostCardFooter({
  optimisticTimeLine,
  session,
  optimisticMutation,
}: {
  optimisticTimeLine: timeLine;
  session: CustomSession | null;
  optimisticMutation: (action: timeLine) => void;
}): JSX.Element {
  const router = useRouter();

  return (
    <>
      <CardFooter className="flex flex-row justify-between p-0">
        {/* Like button */}
        <button
          onClick={async () => {
            optimisticMutation({
              ...optimisticTimeLine,
              isLiked: !optimisticTimeLine.isLiked,
              CountLike: !optimisticTimeLine.isLiked
                ? optimisticTimeLine.CountLike + 1
                : optimisticTimeLine.CountLike - 1,
            });
            session?.user?.access_token
              ? !optimisticTimeLine.isLiked
                ? LikeAPost(optimisticTimeLine._id).catch((err) => {
                    optimisticMutation({
                      ...optimisticTimeLine,
                      isLiked: false,
                      CountLike: optimisticTimeLine.CountLike - 1,
                    });
                  })
                : UnLikeAPost(optimisticTimeLine._id).catch((err) => {
                    optimisticMutation({
                      ...optimisticTimeLine,
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
              optimisticTimeLine.isLiked
                ? "text-pink-500"
                : "text-transparent stroke-black"
            }`}
          />
          <span>Like</span>
        </button>
        {/* Comment button */}
        <Link
          className="btn btn-ghost gap-1 text-base"
          href={`/comment/${optimisticTimeLine._id}`}
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
        <Link
          className="btn btn-ghost gap-1 text-base"
          href={`/share/${optimisticTimeLine._id}`}
        >
          <ShareIcon className="h-6 w-6" />
          <span>Share</span>
        </Link>
      </CardFooter>
    </>
  );
}
