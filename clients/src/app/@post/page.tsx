import PostCard from "@/components/card/postCard";
import { timeLine } from "@/interfaces/post";
import { client } from "@/lib/apolloClient";
import { GETTIMELINE } from "@/queries/post";
import EmptyData from "@/components/emptyData";

async function getData(): Promise<timeLine[]> {
  try {
    const { data } = await client.query<{ getTimeLine: timeLine[] }>({
      query: GETTIMELINE,
    });

    return data.getTimeLine;
  } catch (err) {
    return [];
  }
}

export default async function PostSection(): Promise<JSX.Element> {
  // const data = await getData();
  const data = [
    {
      CountComment: 0,
      CountLike: 1,
      CountShare: 0,
      CreatedAt: "2023-05-10T06:03:20.005Z",
      UpdatedAt: "2023-05-10T06:03:20.005Z",
      _id: "645b33a89a8bdc53cea7c82a",
      allowComment: false,
      imageId: "",
      imageUrl: "",
      text: "test terakhir",
      userId: 6,
      User: {
        UUID: "",
        id: 6,
        imageUrl: "",
        username: "aaaaa",
      },
    },
    {
      CountComment: 0,
      CountLike: 1,
      CountShare: 0,
      CreatedAt: "2023-05-10T06:02:54.342Z",
      UpdatedAt: "2023-05-10T06:02:54.342Z",
      _id: "645b338e9a8bdc53cea7c824",
      allowComment: false,
      imageId: "",
      imageUrl: "https://images.app.goo.gl/m5Tfw32fVWmz4KK8A",
      text: "tes text yang agak panjang sekitar 1-20 kata",
      userId: 6,
      User: {
        UUID: "",
        id: 6,
        imageUrl: "",
        username: "aaaaa",
      },
    },
  ];
  return (
    <>
      <section style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="wrapper" style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', backgroundColor: 'white', color: 'white' , padding: '10px', margin: '10px'}}>
        {data.length ? (
          data.map((timeline: timeLine) => (
            <PostCard timeLine={timeline} key={timeline._id} />
          ))
        ) : (
          <EmptyData message="Data not found" />
        )}
        </div>
      </section>
    </>
  );
}
