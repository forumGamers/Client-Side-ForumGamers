import {
  Card,
  CardHeader,
  Avatar,
  } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import CreatePostCardFooter from "./createpostCardFooter";

export default function CreatePostCard(): JSX.Element {
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
            src={blankProfile}
            variant="circular"
            alt="profile-picture"
            className="cursor-pointer"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex flex-row">
              <button className="btn btn-outline gap-1 text-base">
              Start Your Post
              </button>
            </div>
          </div>
        </CardHeader>
        <CreatePostCardFooter/>
      </Card>
    </>
  );
}
