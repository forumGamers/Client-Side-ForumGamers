import { blankStoreImage } from "@/constants";
import { fixDate } from "@/helper/global";
import { storeData } from "@/interfaces/store";
import Image from "next/image";

export default function StoreProfile({
  store,
}: {
  store: storeData;
}): JSX.Element {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <Image
          className="w-10/100"
          src={store?.image || blankStoreImage}
          alt="Store"
          width={100}
          height={24}
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
