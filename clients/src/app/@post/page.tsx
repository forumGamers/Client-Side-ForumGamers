import PostCard from "@/components/card/postCard";
import { timeLine } from "@/interfaces/post";
import { client } from "@/lib/apolloClient";
import { GETTIMELINE } from "@/queries/post";

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
  const data = await getData();
  return (
    <>
      {data.length ? (
        data.map((timeline: timeLine) => <PostCard timeLine={timeline} />)
      ) : (
        <></>
      )}
    </>
  );
}
