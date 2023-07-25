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
import { useMutation } from "@apollo/client";
import { LIKEAPOST, UNLIKEAPOST } from "@/queries/post";
import { swalError } from "@/helper/swal";
import { useRouter } from "next/navigation";
import Encryption from "@/helper/encryption";

async function sharePost(id: string): Promise<void> {}

export default function PostCardFooter({
  timeLine,
  session,
}: {
  timeLine: timeLine;
  session: CustomSession | null;
}): JSX.Element {
  const router = useRouter();

  const [like] = useMutation(LIKEAPOST, {
    onError(error, clientOptions) {
      console.log(error);
      swalError(error.message);
      timeLine.isLiked = false;
    },
    errorPolicy: "all",
  });

  const [unLike] = useMutation(UNLIKEAPOST, {
    onError(error, clientOptions) {
      swalError(error.message);
      timeLine.isLiked = true;
    },
    errorPolicy: "all",
  });

  async function likePost(
    timeLine: timeLine,
    session: CustomSession
  ): Promise<void> {
    console.log(Encryption.encrypt(timeLine._id));
    timeLine.isLiked = true;

    await like({
      context: {
        headers: {
          access_token: session.user?.access_token,
        },
      },
      variables: {
        likeAPostId: Encryption.encrypt(timeLine._id),
      },
    });
  }

  async function unLikePost(
    timeLine: timeLine,
    session: CustomSession
  ): Promise<void> {
    console.log(2);
    timeLine.isLiked = false;

    await unLike({
      context: {
        headers: {
          access_token: session.user?.access_token,
        },
      },
      variables: {
        unLikeAPostId: Encryption.encrypt(timeLine._id),
      },
    });
  }

  const handleLikeButton = async () => {
    session?.user?.access_token
      ? !timeLine.isLiked
        ? await likePost(timeLine, session as CustomSession)
        : await unLikePost(timeLine, session as CustomSession)
      : router.push("/login");
  };
  return (
    <>
      <CardFooter className="flex flex-row justify-between p-0">
        {/* Like button */}
        <button
          onClick={handleLikeButton}
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
        <button className="btn btn-ghost gap-1 text-base">
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <span>Comment</span>
        </button>

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
