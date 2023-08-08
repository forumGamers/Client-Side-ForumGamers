import { timeLine } from "@/interfaces/post";
import { client } from "@/lib/apolloClient";
import { GETTIMELINE } from "@/queries/post";
import PostCard from "@/components/card/postCard";
import CreatePostCard from "@/components/card/createpostCard";
import EmptyData from "@/components/emptyData";
import { CustomSession } from "@/interfaces/global";
import { checkServerSession } from "@/helper/global";

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

export default async function Page(): Promise<JSX.Element> {
  let userSession: CustomSession | null = null;
  await checkServerSession((session) => {
    userSession = session;
  });
  const data = await getPostData();
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CreatePostCard/>
        {data.length ? (
          data.map((timeline: timeLine) => (
            <PostCard
              timeLine={timeline}
              key={timeline._id}
              session={userSession}
            />
          ))
        ) : (
          <EmptyData message="Data not found" />
        )}
      </section>
    </>
  );
}
