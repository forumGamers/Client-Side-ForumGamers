import { timeLine } from "@/interfaces/post";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
  CardFooter,
} from "@/components/material-tailwind";
import { HeartIcon, ChatBubbleLeftIcon, PaperAirplaneIcon, ShareIcon, EllipsisVerticalIcon } from "@/components/icon";
import { blankProfile } from "@/constants";
import { LazyLoadImage } from "@/components/global";

export default function PostCard({
  timeLine,
}: {
  timeLine: timeLine;
}): JSX.Element {
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
            src={timeLine.User.imageUrl || blankProfile}
            alt="profile-picture"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex flex-row">
              <div className="flex items-start flex-col">
              <Typography className="text-base font-bold" color="blue-gray">
                {timeLine.User.username}
              </Typography>
              <Typography className="text-xs">
                {timeLine.User.id}
              </Typography>
              </div>
              <div className="flex justify-end items-center flex-grow bottom-full z-10">
                <div className="dropdown dropdown-left">
                <button className="btn btn-ghost btn-circle m-1" tabIndex={0}>
                <EllipsisVerticalIcon className="h-6 w-6" />
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-ghost rounded-box w-52">
                  <li><a>Edit</a></li>
                </ul>
                </button>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="mt-2 mb-2 p-0">
        <div className="flex flex-col items-start">
        <Typography>{timeLine.text}</Typography>
        {timeLine.imageUrl && (
        <LazyLoadImage
          className="w-10/100 my-2"
          alt="timeline image"
          src={timeLine.imageUrl}
        />
        )}
        <div className="flex flex-row justify-between items-center w-full">
        <Typography className="text-xs">{timeLine.CountLike} Menyukai</Typography>
        <div className="flex flex-row justify-end items-center flex-grow">
        <Typography className="text-xs">{timeLine.CountComment} Komentar</Typography>
        <Typography className="text-xs ml-2">{timeLine.CountShare} Kali dibagikan</Typography>
        </div>
        </div>
        </div>
          <hr className="mt-2 border-t border-gray-400" />
        </CardBody>
        <CardFooter className="flex flex-row justify-between p-0">
            {/* Like button */}
            <button className="btn btn-ghost gap-1 text-base">
            <HeartIcon className="h-6 w-6" />
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
            <button className="btn btn-ghost gap-1 text-base">
            <ShareIcon className="h-6 w-6" />
            <span>Share</span>
            </button>

        </CardFooter>
      </Card>
    </>
  );
}
