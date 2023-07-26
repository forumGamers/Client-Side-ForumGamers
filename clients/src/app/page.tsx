import styles from "./page.module.css";
import dinamic from "next/dynamic";
const StoreSection = dinamic(
  () => import("@/components/carousel/storeCarousel"),
  {
    loading: () => <Loading />,
  }
);
const TourSection = dinamic(
  () => import("@/components/carousel/tourCarousel"),
  {
    loading: () => <Loading />,
  }
);
const PostSection = dinamic(() => import("@/components/views/post"), {
  loading: () => <Loading />,
});
import Loading from "@/components/loader";
import { checkServerSession } from "@/helper/global";
import { CustomSession } from "@/interfaces/global";
import { client } from "@/lib/apolloClient";
import { GETSTOREDATAFORSTOREPAGE } from "@/queries/store";
import Encryption from "@/helper/encryption";
import { storeData } from "@/interfaces/store";
import { GETTIMELINE } from "@/queries/post";
import { timeLine } from "@/interfaces/post";
import { game } from "@/interfaces/tour";
import { GETGAMELIST } from "@/queries/tour";

async function getPostData(): Promise<timeLine[]> {
  try {
    // const { data } = await client.query<{ getTimeLine: timeLine[] }>({
    //   query: GETTIMELINE,
    // });

    // return data.getTimeLine;
    return [
      {
        CountComment: 0,
        CountLike: 3,
        CountShare: 0,
        CreatedAt: "2023-07-22T13:43:23.421Z",
        Media: {
          id: "64bbdcf906370748f278c5c7",
          type: "video",
          url:
            "https://ik.imagekit.io/b8ugipzgo/postImage/Attack_on_Titan_Season_4_Part_4___Official_Trailer_sY0_PR8AL.mp4",
        },
        UpdatedAt: "2023-07-22T13:43:23.421Z",
        User: {
          UUID: "",
          id: 6,
          imageUrl: "",
          username: "aaaaa",
        },
        _id: "64bbdcfb5d8f1305dd6945e8",
        allowComment: false,
        isLiked: true,
        isShared: false,
        privacy: "Public",
        tags: [],
        text: "",
        userId: 6,
      },
      {
        CountComment: 0,
        CountLike: 1,
        CountShare: 0,
        CreatedAt: "2023-05-10T06:03:20.005Z",
        Media: {
          id: "",
          type: "",
          url: "",
        },
        UpdatedAt: "2023-05-10T06:03:20.005Z",
        User: {
          UUID: "",
          id: 6,
          imageUrl: "",
          username: "aaaaa",
        },
        _id: "645b33a89a8bdc53cea7c82a",
        allowComment: false,
        isLiked: false,
        isShared: false,
        privacy: "Public",
        tags: [],
        text: "test terakhir",
        userId: 6,
      },
      {
        CountComment: 0,
        CountLike: 1,
        CountShare: 0,
        CreatedAt: "2023-05-10T06:03:15.368Z",
        Media: {
          id: "",
          type: "",
          url: "",
        },
        UpdatedAt: "2023-05-10T06:03:15.368Z",
        User: {
          UUID: "",
          id: 6,
          imageUrl: "",
          username: "aaaaa",
        },
        _id: "645b33a39a8bdc53cea7c828",
        allowComment: false,
        isLiked: false,
        isShared: false,
        privacy: "Public",
        tags: [],
        text: "test text lagi",
        userId: 6,
      },
      {
        CountComment: 0,
        CountLike: 1,
        CountShare: 0,
        CreatedAt: "2023-05-10T06:02:54.342Z",
        Media: {
          id: "",
          type: "",
          url: "",
        },
        UpdatedAt: "2023-05-10T06:02:54.342Z",
        User: {
          UUID: "",
          id: 6,
          imageUrl: "",
          username: "aaaaa",
        },
        _id: "645b338e9a8bdc53cea7c824",
        allowComment: false,
        isLiked: false,
        isShared: false,
        privacy: "Public",
        tags: [],
        text: "tes text yang agak panjang sekitar 1-20 kata",
        userId: 6,
      },
      {
        CountComment: 0,
        CountLike: 0,
        CountShare: 0,
        CreatedAt: "2023-05-09T11:21:52.047Z",
        Media: {
          id: "",
          type: "",
          url: "",
        },
        UpdatedAt: "2023-05-09T11:21:52.047Z",
        User: {
          UUID: "",
          id: 6,
          imageUrl: "",
          username: "aaaaa",
        },
        _id: "645a2cd034a07b6a9a920b4c",
        allowComment: false,
        isLiked: false,
        isShared: false,
        privacy: "Public",
        tags: ["tes"],
        text: "test 123",
        userId: 6,
      },
    ];
  } catch (err) {
    return [];
  }
}

async function getStoreData(): Promise<storeData[]> {
  try {
    // const { data } = await client.query<{ getAllStore: storeData[] }>({
    //   query: GETSTOREDATAFORSTOREPAGE,
    //   variables: {
    //     query: {
    //       limit: Encryption.encrypt("6"),
    //     },
    //   },
    // });

    // return data.getAllStore;
    return [
      {
        CreatedAt: "2023-03-30T14:08:57.710477+07:00",
        ID: 1,
        StoreStatus: {
          id: 1, //ini kurang
          name: "Basic",
        },
        active: true,
        avg_rating: 5,
        image: "",
        name: "testing store",
        rating_count: 2,
        description: "", //ini kurang
        followers: 1, //ini
        Items: [], //ini
        background: "", //ini
        exp: 0, //ini
        status_id: 1, //ini
      },
      {
        CreatedAt: "2023-03-30T14:08:57.710477+07:00",
        ID: 2,
        StoreStatus: {
          id: 1,
          name: "Basic",
        },
        active: true,
        avg_rating: 5,
        image: "",
        name: "apa aja",
        rating_count: 2,
        description: "", //ini kurang
        followers: 1, //ini
        Items: [], //ini
        background: "", //ini
        exp: 0, //ini
        status_id: 1, //ini
      },
      {
        CreatedAt: "2023-03-30T14:08:57.710477+07:00",
        ID: 3,
        StoreStatus: {
          name: "Basic",
          id: 1,
        },
        active: true,
        avg_rating: 5,
        image: "",
        name: "tes123 store",
        rating_count: 2,
        description: "", //ini kurang
        followers: 1, //ini
        Items: [], //ini
        background: "", //ini
        exp: 0, //ini
        status_id: 1, //ini
      },
    ];
  } catch (err) {
    return [];
  }
}

async function getTourGameData(): Promise<game[]> {
  try {
    // const { data } = await client.query<{ getGameList: game[] }>({
    //   query: GETGAMELIST,
    // });

    // return data.getGameList;
    return [
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
  } catch (err) {
    return [];
  }
}

export default async function Home(): Promise<JSX.Element> {
  let userSession: CustomSession | null = null;
  await checkServerSession((session) => {
    userSession = session;
  });

  const postData = await getPostData();
  const storeData = await getStoreData();
  const gameData = await getTourGameData();
  return (
    <>
      <main className={styles.main}>
        <PostSection session={userSession} data={postData} />
        <StoreSection data={storeData} />
        <TourSection data={gameData} />
      </main>
    </>
  );
}
