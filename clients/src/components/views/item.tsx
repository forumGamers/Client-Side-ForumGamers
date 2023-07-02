import { item } from "@/interfaces/store";
import Navbar, { DropDown } from "../navbar";
import { LazyLoadImage } from "@/components/global";
import Loading from "../loader";

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
            <LazyLoadImage
              src={item.image}
              alt={item.name}
              placeholder={<Loading type="bar" />}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}
