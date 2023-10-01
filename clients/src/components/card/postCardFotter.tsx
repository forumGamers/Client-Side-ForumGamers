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
            className={`h-6 w-6 text-[#EE2924] ${
              optimisticTimeLine?.isLiked
                ? "text-[#EE2924]"
                : "text-transparent stroke-[#EE2924]"
            }`}
          />
          <span style={{ textTransform: "none" }}>Like</span>
        </button>
        {/* Comment button */}
        <Link
          className="btn btn-ghost gap-1 text-white/50"
          href={`/comment/${optimisticTimeLine._id}`}
        >
          <ChatBubbleLeftIcon className="h-6 w-6 text-[#EE2924]" />
          <span style={{ textTransform: "none" }}>Comment</span>
        </Link>

        {/* Send button */}
        <button className="btn btn-ghost gap-1 text-white/50">
          <PaperAirplaneIcon className="h-6 w-6 text-[#EE2924]" />
          <span style={{ textTransform: "none" }}>Send</span>
        </button>

        {/* Share button */}
        <Link
          className="btn btn-ghost gap-1 text-white/50"
          href={`/share/${optimisticTimeLine._id}`}
        >
          <ShareIcon className="h-6 w-6 text-[#EE2924]" />
          <span style={{ textTransform: "none" }}>Share</span>
        </Link>
      </CardFooter>
    </>
  );
}
