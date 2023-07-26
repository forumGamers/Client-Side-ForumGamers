import { timeLine } from "@/interfaces/post";
import {
  Card,
  CardHeader,
  Avatar,
  } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import CreatePostCardFooter from "./createpostCardFooter";
import { CustomSession } from "@/interfaces/global";
import { LazyLoadImage } from "@/components/global";

export default function CreatePostCard({
  timeLine,
  session,
}: {
    timeLine: timeLine;
    session: CustomSession | null;
  }
): JSX.Element {
  return (
    <>
      <Card color="transparent" shadow={false} className="w-full bg-white max-w-[42rem] p-5 m-3">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="relative mx-0 flex bg-red items-start gap-3 mt-2 mb-2"
        >
          <Avatar
            size="md"
            variant="circular"
            src={timeLine.User.imageUrl ||blankProfile}
            alt="profile-picture"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex flex-row">
              <button className="btn btn-outline gap-1 text-base">
              <span>Buat Postingan</span>
              </button>
            </div>
          </div>
        </CardHeader>
        <CreatePostCardFooter timeLine={timeLine} session={session} />
      </Card>
    </>
  );
}
