import Encryption from "@/helper/encryption";
import { comment } from "@/interfaces/post";
import { client } from "@/lib/apolloClient";
import { GETPOSTCOMMENT } from "@/queries/post";
import Wrapper from "./wrapper";

async function getCommentData(id: string): Promise<comment[]> {
  try {
    // const { data } = await client.query<{ getPostComment: comment[] }>({
    //   query: GETPOSTCOMMENT,
    //   variables: {
    //     getPostCommentId: Encryption.encrypt(id),
    //   },
    // });

    // return data.getPostComment;
    return [
      {
        CreatedAt: "2023-07-26T15:24:41.394Z",
        Reply: [
          {
            CreatedAt: "2023-07-26T15:30:59.322Z",
            UpdatedAt: "2023-07-26T15:30:59.322Z",
            _id: "64c13c3305b6e9368d51a399",
            commentId: "64c13ab9bdf24156e9444f86",
            text: "tes mau reply comment",
            userId: 6,
          },
        ],
        UpdatedAt: "2023-07-26T15:24:41.394Z",
        _id: "64c13ab9bdf24156e9444f86",
        text: "tes mau comment",
        postId: "645a2cd034a07b6a9a920b4c",
        userId: 6,
        User: {
          id: 6,
          UUID: "widasdakndsakda",
          username: "test",
          imageUrl: "",
        },
      },
    ];
  } catch (err) {
    return [];
  }
}

export default async function CommentSection({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const data = await getCommentData(params.id);
  return (
    <>
      <section>
        <Wrapper comment={data} />
      </section>
    </>
  );
}
