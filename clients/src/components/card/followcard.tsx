import { Card, CardHeader, CardFooter, Typography, CardBody } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import { Avatar } from "@/components/material-tailwind";
import {
  PhotoIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  NewspaperIcon,
} from "@/components/icon";

export default function Followcard(): JSX.Element {
  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-[20rem] h-[30rem] p-3 mt-12 mb-3 bg-[#16181C]"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="relative mx-0 flex items-start mt-2 p-2"
        > 
          <Typography className="text-white text-base font-medium">
            You May Know
          </Typography>
        </CardHeader>
        <CardBody
        className="flex flex-1 flex-row justify-between w-full p-2"
        >
          <div className="flex flex-1 flex-row justify-start gap-2">
          <Avatar
            src={blankProfile}
            variant="circular"
            alt="profile-picture"
            className="cursor-pointer w-12 h-12"
          />
          <div className="flex flex-col">
          <Typography className="text-sm font-semibold text-white">
            Shania Ryn
          </Typography>
          <Typography className="text-xs">
            @rynn
          </Typography>
          </div>
          </div>
          <button className="btn btn-ghost bg-[#D9D9D9] text-[#16181C] text-sm rounded-full w-[5rem]">
            <span style={{ textTransform: "none" }}>Follow</span>
          </button>
          </CardBody>
          <CardFooter
          className="relative flex items-start p-2"
          >
            <a href="#" className="text-[#EE2924] text-sm font-semibold hover:underline">Show More</a>
          </CardFooter>
      </Card>
    </>
  );
}
