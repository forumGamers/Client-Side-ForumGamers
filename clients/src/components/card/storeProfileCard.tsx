import { blankStoreImage } from "@/constants";
import { fixDate } from "@/helper/global";
import { store } from "@/interfaces/store";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function StoreProfile({ store }: { store: store }): JSX.Element {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <LazyLoadImage
          className="w-10/100"
          src={store?.image || blankStoreImage}
          alt="Store"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{store?.name}</h2>
        <div className="flex flex-row">
          <h4 className="flex-shrink">Followers :{store?.followers}</h4>
          <h4 className="flex-shrink">Status : {store?.StoreStatus.name}</h4>
          <h4 className="flex-shrink">
            Ratings : {store?.avg_rating} / {store?.rating_count}{" "}
            {store?.rating_count > 1 ? "Votes" : "Vote"}
          </h4>
          <h4>Join at {fixDate(store?.CreatedAt)}</h4>
          <h4>Products : {store?.Items.length || 0}</h4>
        </div>
        <p>{store?.description || ""}</p>
      </div>
    </div>
  );
}
