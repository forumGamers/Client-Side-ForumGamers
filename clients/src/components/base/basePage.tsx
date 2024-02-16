import { CustomSession } from "@/interfaces/global";
import NavigationBar from "../navigationBar";
import { checkServerSession } from "@/helper/global";
import { Typography } from "@/components/material-tailwind";
import Link from "next/link";
import CardMsg from "../organ/CardMsg";
import RoomChat from "../organ/RoomChat";
import Chat from "../mollecul/Chat";

export default async function BasePage({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  let userSession: CustomSession | null = null;
  await checkServerSession((session) => {
    userSession = session;
  });
  return (
    <>
      <NavigationBar session={userSession}/>
      {children}
      <div className="w-full gap-5 flex flex-row items-end justify-end margin-top-auto fixed bottom-0 right-5 z-[10]">
        <RoomChat session={null}/>
        <CardMsg session={null}/>
      </div>

      {/* <div className="w-full">
        <CardCht session={null}/>
      </div>
      <div  className="w-full">
      <Msgcard session={null} />
      </div> */}
      <footer className="w-full bg-white p-8 bottom-0">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
          <img src="/img/logo-ct-dark.png" alt="logo-ct" className="w-10" />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Link href="/company/about">
                <Typography
                  as="a"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  About Us
                </Typography>
              </Link>
            </li>
            <li>
              <Link href="/company/license">
                <Typography
                  as="a"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  License
                </Typography>
              </Link>
            </li>
            <li>
              <Link href="/company/team">
                <Typography
                  as="a"
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Our Team
                </Typography>
              </Link>
            </li>
            <li>
              <Typography
                as="a"
                href="mailto:forumgamersindo@gmail.com"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contact Us
              </Typography>
            </li>
          </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center font-normal">
          &copy; 2023 Forum Gamers
        </Typography>
      </footer>
    </>
  );
}
