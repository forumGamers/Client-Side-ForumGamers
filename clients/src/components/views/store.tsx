import { item, storeData } from "@/interfaces/store";
import StoreProfile from "../card/storeProfileCard";
import ItemCard from "../card/cardItem";
import EmptyData from "../emptyData";

export default function StorePage({
  store,
}: {
  store: storeData;
}): JSX.Element {
  return (
    <>
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
