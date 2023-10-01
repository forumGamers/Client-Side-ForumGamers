import { Card, CardHeader, CardFooter } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import { Avatar } from "@/components/material-tailwind";
import {
  PhotoIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  NewspaperIcon,
} from "@/components/icon";

export default function CreatePostCard(): JSX.Element {
  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-[75rem] p-3 mt-12 mb-3 bg-[#030712] border border-white/50"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="relative mx-0 flex bg-red items-start gap-3 mt-2 mb-3"
        >
          <Avatar
            src={blankProfile}
            variant="circular"
            alt="profile-picture"
            className="cursor-pointer"
          />
          <div className="flex w-full">
              <button className="btn btn-ghost flex justify-start gap-1 text-white/50 border border-white/50 rounded-2xl w-full">
                <span style={{ textTransform: "none" }}>Start Create Post</span>
              </button>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-row justify-between p-0">
          {/* Foto button */}
          <button className="btn btn-ghost gap-1 text-white/50">
            <PhotoIcon className="h-6 w-6 text-[#EE2924]" />
            <span style={{ textTransform: "none" }}>Foto</span>
          </button>
          {/* Video button */}
          <button className="btn btn-ghost gap-1 text-white/50">
            <VideoCameraIcon className="h-6 w-6 text-[#EE2924]" />
            <span style={{ textTransform: "none" }}>Video</span>
          </button>

          {/* Event button */}
          <button className="btn btn-ghost gap-1 text-white/50">
            <CalendarDaysIcon className="h-6 w-6 text-[#EE2924]" />
            <span style={{ textTransform: "none" }}>Event</span>
          </button>
        </CardFooter>
      </Card>
    </>
  );
}
