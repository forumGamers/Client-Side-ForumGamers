"use client";

import { CardFooter } from "@/components/material-tailwind";
import { PhotoIcon, VideoCameraIcon, CalendarDaysIcon, NewspaperIcon } from "@/components/icon";
import { timeLine } from "@/interfaces/post";
import { CustomSession } from "@/interfaces/global";
import Encryption from "@/helper/encryption";

async function sharePost(id: string): Promise<void> {}

export default function CreatePostCardFooter({
  timeLine,
  session,
}: {
  timeLine: timeLine;
  session: CustomSession | null;
}): JSX.Element {
  return (
    <>
        <CardFooter className="flex flex-row justify-between p-0">
            {/* Like button */}
            <button className="btn btn-ghost gap-1 text-base">
            <PhotoIcon className="h-6 w-6" />
            <span>Foto</span>
            </button>
             {/* Comment button */}
            <button className="btn btn-ghost gap-1 text-base">
            <VideoCameraIcon className="h-6 w-6" />
            <span>VIdeo</span>
            </button>

            {/* Share button */}
            <button className="btn btn-ghost gap-1 text-base">
            <CalendarDaysIcon className="h-6 w-6" />
            <span>Acara</span>
            </button>

            {/* Send button */}
            <button className="btn btn-ghost gap-1 text-base">
            <NewspaperIcon className="h-6 w-6" />
            <span>Artikel</span>
            </button>
        </CardFooter>
    </>
  );
}
