import PostCard from "@/components/card/postCard";
import CreatePostCard from "@/components/card/postCard";
import { timeLine } from "@/interfaces/post";
import EmptyData from "@/components/emptyData";
import { CustomSession } from "@/interfaces/global";

export default function PostSection({
  data,
  session,
}: {
  data: timeLine[];
  session: CustomSession | null;
}): JSX.Element {
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {data.length ? (
          data.map((timeline: timeLine) => (
            <PostCard
              timeLine={timeline}
              key={timeline._id}
              session={session}
            />
          ))
        ) : (
          <EmptyData message="Data not found" />
        )}
      </section>
    </>
  );
}
