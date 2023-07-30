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
import { useTransition } from "react";

async function sharePost(id: string): Promise<void> {}

export default function PostCardFooter({
  timeLine,
  session,
}: {
  timeLine: timeLine;
  session: CustomSession | null;
}): JSX.Element {
  const router = useRouter();

  const [_, startTransition] = useTransition();

  const handleLikeButton = async () => {
    try {
      timeLine.isLiked = !timeLine.isLiked;
      session?.user?.access_token
        ? timeLine.isLiked
          ? await LikeAPost({
              id: timeLine._id,
              access_token: session.user.access_token as string,
            }).catch(err => {
              console.log({err})
            })
          : await UnLikeAPost({
              id: timeLine._id,
              access_token: session.user.access_token as string,
            })
        : router.push("/login");
    } catch (err) {
      timeLine.isLiked = !timeLine.isLiked;
    }
  };
  return (
    <>
      <CardFooter className="flex flex-row justify-between p-0">
        {/* Like button */}
        <button
          onClick={() =>
            startTransition(() => {
              handleLikeButton();
            })
          }
          className="btn btn-ghost gap-1 text-base"
        >
          <HeartIcon
            className={`h-6 w-6 text-pink-500 ${
              timeLine.isLiked
                ? "text-pink-500"
                : "text-transparent stroke-black"
            }`}
          />
          <span>Like</span>
        </button>
        {/* Comment button */}
        <Link
          className="btn btn-ghost gap-1 text-base"
          href={`/comment/${timeLine._id}`}
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
            sharePost(timeLine._id);
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
