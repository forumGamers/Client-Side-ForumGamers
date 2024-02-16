"use client";

import { timeLine } from "@/interfaces/post";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@/components/material-tailwind";
import { EllipsisVerticalIcon } from "@/components/icon";
import { LazyLoadImage } from "@/components/global";
import PostCardFooter from "./postCardFotter";
import { CustomSession } from "@/interfaces/global";
import AvatarProfile from "../avatar/avatarProfile";
import { experimental_useOptimistic as useOptimistic } from "react";

export default function PostCard({
  timeLine,
  session,
}: {
  timeLine: timeLine;
  session: CustomSession | null;
}): JSX.Element {
  const [optimisticTimeLine, optimisticMutation] = useOptimistic(
    timeLine,
    (state, updatedField: timeLine) => ({
      ...state,
      ...updatedField,
    })
  );
  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-[75rem] p-5 m-3 bg-[#030712] border border-white/50"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="relative mx-0 flex bg-red items-start gap-3 mt-2 mb-2 text-white"
        >
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex flex-row">
              <AvatarProfile user={optimisticTimeLine.User} />
              <div className="flex justify-end items-center flex-grow bottom-full z-10">
                <div className="dropdown dropdown-left">
                  <button className="btn btn-ghost btn-circle m-1" tabIndex={0}>
                    <EllipsisVerticalIcon className="h-6 w-6 text-white" />
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow-lg bg-ghost rounded-box w-52 z-[1]"
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
          <div className="flex flex-col items-start text-white">
            <Typography>{optimisticTimeLine.text}</Typography>
            {optimisticTimeLine.Media.url && (
              <LazyLoadImage
                className="w-10/100 my-2"
                alt="timeline image"
                src={optimisticTimeLine.Media.url}
              />
            )}
            <div className="flex flex-row justify-between items-center w-full">
              <Typography className="text-xs">
                {optimisticTimeLine.CountLike}{" "}
                {`like${optimisticTimeLine.CountLike > 1 ? "s" : ""}`}
              </Typography>
              <div className="flex flex-row justify-end items-center flex-grow">
                <Typography className="text-xs">
                  {optimisticTimeLine.CountComment}{" "}
                  {`comment${optimisticTimeLine.CountComment > 1 ? "s" : ""}`}
                </Typography>
                <Typography className="text-xs ml-2">
                  {optimisticTimeLine.CountShare}{" "}
                  {`share${optimisticTimeLine.CountShare > 1 ? "s" : ""}`}
                </Typography>
              </div>
            </div>
          </div>
          <hr className="mt-2 border-t border-gray-400" />
        </CardBody>
        <PostCardFooter
          optimisticTimeLine={optimisticTimeLine}
          session={session}
          optimisticMutation={optimisticMutation}
        />
      </Card>
    </>
  );
}