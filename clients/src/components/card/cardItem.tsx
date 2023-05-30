import { blankStoreImage } from "@/constants";
import { item } from "@/interfaces/store";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ItemCard({ item }: { item: item }): JSX.Element {
  return (
    <>
      <div className="card bg-base-100 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4">
        <figure>
          <LazyLoadImage src={item?.image || blankStoreImage} alt="item-img" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.status}</div>
          </h2>
          <p>{item.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{item.stock}</div>
            <div className="badge badge-outline">{item.price}</div>
          </div>
        </div>
      </div>
    </>
  );
}
