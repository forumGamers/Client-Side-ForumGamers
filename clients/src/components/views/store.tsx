import { item, store } from "@/interfaces/store";
import Navbar, { DropDown } from "../navbar";
import StoreProfile from "../card/storeProfileCard";
import ItemCard from "../card/cardItem";
import EmptyData from "../emptyData";

export default function StorePage({
  store,
  dropDown,
}: {
  store: store;
  dropDown: DropDown[];
}): JSX.Element {
  return (
    <>
      <Navbar isLoggedUser={true} dropdown={dropDown} />
      <StoreProfile store={store} />
      <section>
        {store?.Items.length ? (
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
              {store.Items.map((item: item) => (
                <ItemCard item={item} key={item.ID} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyData message="No Data" />
        )}
      </section>
    </>
  );
}
