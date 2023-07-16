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
      CreatedAt: "2023-05-10T06:03:15.368Z",
      UpdatedAt: "2023-05-10T06:03:15.368Z",
      _id: "645b33a39a8bdc53cea7c828",
      allowComment: false,
      imageId: "",
      imageUrl: "",
      text: "test text lagi",
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
      CreatedAt: "2023-05-10T06:03:10.627Z",
      UpdatedAt: "2023-05-10T06:03:10.627Z",
      _id: "645b339e9a8bdc53cea7c826",
      allowComment: false,
      imageId: "",
      imageUrl: "",
      text: "yang ini pendekan",
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
      imageUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn0-production-images-kly.akamaized.net%2FakZRyRVhv5O5BLXTAJkLjzHTjIk%3D%2F800x450%2Fsmart%2Ffilters%3Aquality(75)%3Astrip_icc()%3Aformat(webp)%2Fkly-media-production%2Fmedias%2F1303514%2Foriginal%2F022387500_1469994543-042314600_1457967620-nj.jpg&tbnid=61JgI8NWqVXgcM&vet=12ahUKEwiSlerch5OAAxWRmmMGHWHODaMQMygEegUIARDCAQ..i&imgrefurl=https%3A%2F%2Fwww.liputan6.com%2Fregional%2Fread%2F2962141%2Fmenjaga-harimau-sumatera-agar-tak-punah&docid=KXOCtmDYKITimM&w=800&h=450&q=harimau&ved=2ahUKEwiSlerch5OAAxWRmmMGHWHODaMQMygEegUIARDCAQ",
      text: "tes text yang agak panjang sekitar 1-20 kata",
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
      CountLike: 0,
      CountShare: 0,
      CreatedAt: "2023-05-09T11:21:52.047Z",
      UpdatedAt: "2023-05-09T11:21:52.047Z",
      _id: "645a2cd034a07b6a9a920b4c",
      allowComment: false,
      imageId: "",
      imageUrl: "",
      text: "test 123",
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
      <section className="container d-flex justify-content-center align-items-center">
        {data.length ? (
          data.map((timeline: timeLine) => (
            <PostCard timeLine={timeline} key={timeline._id} />
          ))
        ) : (
          <EmptyData message="Data not found" />
        )}
      </section>
    </>
  );
}
