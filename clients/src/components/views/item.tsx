import { item } from "@/interfaces/store";
import Navbar, { DropDown } from "../navbar";
import Image from "next/image";

export default function ItemPage({
  item,
  dropdown,
}: {
  item: item;
  dropdown?: DropDown[];
}): JSX.Element {
  return (
    <>
      {dropdown ? <Navbar dropdown={dropdown} isLoggedUser={false} /> : null}
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={24}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}
