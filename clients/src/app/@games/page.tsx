import { game } from "@/interfaces/tour";
import { client } from "@/lib/apolloClient";
import { GETGAMELIST } from "@/queries/tour";
import { LazyLoadImage } from "@/components/global";
import EmptyData from "@/components/emptyData";

async function getData(): Promise<game[]> {
  try {
    const { data } = await client.query<{ getGameList: game[] }>({
      query: GETGAMELIST,
    });

    return data.getGameList;
  } catch (err) {
    return [];
  }
}

export default async function TourSection(): Promise<JSX.Element> {
  const data = await getData();

  return (
    <>
      <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
        {data.length ? (
          data.map((el: game) => (
            <>
              <div className="carousel-item">
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
