import { game } from "@/interfaces/tour";
import { LazyLoadImage } from "@/components/global";
import EmptyData from "@/components/emptyData";

export default function TourSection({ data }: { data: game[] }): JSX.Element {

  return (
    <>
      <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
        {data.length ? (
          data.map((el: game) => (
            <>
              <div className="carousel-item" key={el._id}>
                <LazyLoadImage src={el.image} className="rounded-box" />
              </div>
            </>
          ))
        ) : (
          <EmptyData message="Data not found" />
        )}
      </div>
    </>
  );
}
