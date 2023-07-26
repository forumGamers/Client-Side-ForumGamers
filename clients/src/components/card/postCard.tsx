import { timeLine } from "@/interfaces/post";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
} from "@/components/material-tailwind";
import { EllipsisVerticalIcon } from "@/components/icon";
import { blankProfile } from "@/constants";
import { LazyLoadImage } from "@/components/global";
import PostCardFooter from "./postCardFotter";
import { CustomSession } from "@/interfaces/global";

export default function PostCard({
  timeLine,
  session,
}: {
  timeLine: timeLine;
  session: CustomSession | null;
}): JSX.Element {
  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="w-full bg-white max-w-[42rem] p-5 m-3"
      >
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
                <Typography className="text-xs">{timeLine.User.id}</Typography>
              </div>
              <div className="flex justify-end items-center flex-grow bottom-full z-10">
                <div className="dropdown dropdown-left">
                  <button className="btn btn-ghost btn-circle m-1" tabIndex={0}>
                    <EllipsisVerticalIcon className="h-6 w-6" />
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow-lg bg-ghost rounded-box w-52"
                    >
                      <li>
                        <a>Edit</a>
                      </li>
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
            {timeLine.Media.url && (
              <LazyLoadImage
                className="w-10/100 my-2"
                alt="timeline image"
                src={timeLine.Media.url}
              />
            )}
            <div className="flex flex-row justify-between items-center w-full">
              <Typography className="text-xs">
                {timeLine.CountLike}{" "}
                {`like${timeLine.CountLike > 1 ? "s" : ""}`}
              </Typography>
              <div className="flex flex-row justify-end items-center flex-grow">
                <Typography className="text-xs">
                  {timeLine.CountComment}{" "}
                  {`comment${timeLine.CountComment > 1 ? "s" : ""}`}
                </Typography>
                <Typography className="text-xs ml-2">
                  {timeLine.CountShare}{" "}
                  {`share${timeLine.CountShare > 1 ? "s" : ""}`}
                </Typography>
              </div>
            </div>
          </div>
          <hr className="mt-2 border-t border-gray-400" />
        </CardBody>
        <PostCardFooter timeLine={timeLine} session={session} />
      </Card>
    </>
  );
}