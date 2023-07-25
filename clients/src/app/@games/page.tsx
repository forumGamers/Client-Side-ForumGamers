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
  // const data = await getData();
  const data = [
    {
      description: "ngetes",
      _id: "642664603bc312e11423a98f",
      image:
        "https://ik.imagekit.io/b8ugipzgo/gameImage/Flappy_Bird_icon_tOdeVaMZ5v.png",
      name: "flappy bird",
      type: "Single Player",
    },
    {
      description: "ngetes",
      _id: "642675aefddc53d5e5cfe97b",
      image:
        "https://ik.imagekit.io/b8ugipzgo/gameImage/angry_birds_qHour1mAY.jpg",
      name: "angry bird",
      type: "Single Player",
    },
    {
      description: "ngetes",
      _id: "6426764ae878a6a7e07da2cf",
      image:
        "https://ik.imagekit.io/b8ugipzgo/gameImage/angry_birds_2_6O1VxF2d4.jpg",
      name: "angry bird 2",
      type: "Single Player",
    },
    {
      description: "ngetes",
      _id: "642676d429cb7697238dde68",
      image:
        "https://ik.imagekit.io/b8ugipzgo/gameImage/angry_birds_rio_DP-YEesvP.jpg",
      name: "angry bird rio",
      type: "Single Player",
    },
  ];

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
