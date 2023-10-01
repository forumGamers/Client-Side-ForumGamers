import { Card, CardHeader, CardFooter, CardBody, Typography } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import { Avatar } from "@/components/material-tailwind";

export default function Profilecard(): JSX.Element {
  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-[20rem] h-[25.3rem] p-3 mt-12 mb-3 bg-[#030712] border border-white/50"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-auto"
        >
          <Avatar
            src={blankProfile}
            variant="circular"
            alt="profile-picture"
            className="cursor-pointer w-24 h-24"
          />
        </CardHeader>
        <CardBody>
          <div className="flex flex-col justify-between items-center w-full">
          <Typography  className="text-lg font-semibold text-white">
            Nurul Cantik
          </Typography>
          <Typography>
            @orgcantik
          </Typography>
          <Typography className="text-white text-center mt-3">
          Saya seorang gamer bersemangat dengan pengalaman lebih
          <a href="#" className="text-white font-semibold hover:underline"> more</a>
          </Typography>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-center">
        <button className="btn btn-ghost bg-[#D9D9D9] gap-1 text-[#16181C] border border-white/50 rounded-full w-[8rem] px-4 py-2">
            <span style={{ textTransform: "none" }}>Edit Profile</span>
          </button>
        </CardFooter>
      </Card>
    </>
  );
}
