import { blankStoreImage } from "@/constants";
import { storeData } from "@/interfaces/store";
import { LazyLoadImage } from "@/components/global";

export default function StoreCard({
  store,
}: {
  store: storeData;
}): JSX.Element {
  return (
    <>
      <div className="card bg-base-100 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4">
        <figure>
          <LazyLoadImage src={store?.image || blankStoreImage} alt="item-img" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {store.name}
            <div className="badge badge-secondary">
              {store.StoreStatus.name}
            </div>
          </h2>
          <p>{store.exp}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{store.avg_rating}</div>
            <div className="badge badge-outline">{store.rating_count}</div>
          </div>
        </div>
      </div>
    </>
  );
}
