import { Card, CardHeader, CardFooter, Typography, CardBody } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import { Avatar } from "@/components/material-tailwind";
import {
  ChevronDownIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon
} from "@/components/icon";
import { timeLine } from "@/interfaces/post";
import { CustomSession } from "@/interfaces/global";
import { useRouter } from "next/navigation";

export default function Msgcard({
  optimisticTimeLine,
  session,
  optimisticMutation,
}: {
  optimisticTimeLine: timeLine;
  session: CustomSession | null;
  optimisticMutation: (action: timeLine) => void;
}): JSX.Element {
  
  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="block w-full max-w-[20rem] h-[35rem] p-3 mt-12 bg-[#030712] border border-white/50 fixed bottom-0"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="relative mx-0 flex-col items-start mt-1 p-2"
        >
          <div className="flex flex-1 flex-row space-between">
          <Typography className="text-white text-base font-medium">
            Messages
          </Typography>
          <div className="flex flex-1 flex-row justify-end gap-2">
          <button>
            <PencilSquareIcon
            className="text-white h-6 w-6"
            />
          </button>
          <button>
            <ChevronDownIcon
            className="text-white h-6 w-6"
            />
          </button>
          </div>
          </div>
          <div className="items-center mt-5">
          <button className="btn btn-ghost flex justify-start gap-1 text-white/50 bg-[#16181C] w-full rounded-2xl">
            <MagnifyingGlassIcon className="h-6 w-6 text-white/50" /> 
            <span className="text-left" style={{ textTransform: "none"}}>Search Message</span>
          </button>
          </div>
          <div className="items-center mt-5 flex flex-row space-between">
          <button className={`btn btn-ghost gap-1 text-white/50 w-1/2 rounded-none } ${
              optimisticTimeLine?.isLiked
                ? "text-[#EE2924]"
                : "text-transparent stroke-[#EE2924]"
            }`}>
            <span style={{ textTransform: "none"}}>Chat</span>
          </button>
          <button className="btn btn-ghost gap-1 text-white/50 w-1/2 rounded-none">
            <span style={{ textTransform: "none"}}>Group</span>
          </button>
          </div>
        </CardHeader>
        <CardBody>
          </CardBody>
      </Card>
    </>
  );
}
