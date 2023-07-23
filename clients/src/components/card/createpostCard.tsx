import {
  Card,
  CardHeader,
  CardFooter,
} from "@/components/material-tailwind";
import { PhotoIcon, VideoCameraIcon, CalendarDaysIcon, NewspaperIcon } from "@/components/icon";

export default function CreatePostCard(
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
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex flex-row">
              <button className="btn btn-ghost gap-1 text-base">
              <span>Buat Postingan</span>
              </button>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-row justify-between p-0">
            {/* Like button */}
            <button className="btn btn-ghost gap-1 text-base">
            <PhotoIcon className="h-6 w-6" />
            <span>Foto</span>
            </button>
             {/* Comment button */}
            <button className="btn btn-ghost gap-1 text-base">
            <VideoCameraIcon className="h-6 w-6" />
            <span>VIdeo</span>
            </button>

            {/* Share button */}
            <button className="btn btn-ghost gap-1 text-base">
            <CalendarDaysIcon className="h-6 w-6" />
            <span>Acara</span>
            </button>

            {/* Send button */}
            <button className="btn btn-ghost gap-1 text-base">
            <NewspaperIcon className="h-6 w-6" />
            <span>Artikel</span>
            </button>
        </CardFooter>
      </Card>
    </>
  );
}
