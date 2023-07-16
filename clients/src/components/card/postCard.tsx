import { timeLine } from "@/interfaces/post";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
} from "@/components/material-tailwind";
import { StarIcon } from "@/components/icon";
import { blankProfile } from "@/constants";
import { LazyLoadImage } from "@/components/global";

export default function PostCard({
  timeLine,
}: {
  timeLine: timeLine;
}): JSX.Element {
  return (
    <>
      <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="lg"
            variant="circular"
            src={timeLine.User.imageUrl || blankProfile}
            alt="profile-picture"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                {timeLine.User.username}
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography>{timeLine.text}</Typography>
          {timeLine.imageUrl && (
            <LazyLoadImage
              className="w-10/100"
              alt="timeline image"
              src={timeLine.imageUrl}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
}
