"use client";

import { experimental_useOptimistic as useOptimistic, useState } from "react";
import dinamic from "next/dynamic";
import Loading from "@/components/loader";
import EmptyData from "@/components/emptyData";
import { Button, Textarea } from "@/components/material-tailwind";
import { commentAPost } from "@/actions/post";
import { useParams } from "next/navigation";
const CommentCard = dinamic(() => import("@/components/card/comment"), {
  loading: () => <Loading />,
});

type CommentSection = {
  text: string;
  Reply: { text: string; _id: string }[];
  _id: string;
};

export default function Wrapper({
  comment,
}: {
  comment: CommentSection[];
}): JSX.Element {
  const [optimisticComment, commentMutation] = useOptimistic(
    comment,
    (state, newComment: CommentSection) =>
      state.length ? [newComment, ...state] : [newComment]
  );

  const [text, setText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { id } = useParams() as Record<string, string>;

  return (
    <>
      {optimisticComment.length ? (
        optimisticComment.map((comment) => (
          <CommentCard comment={comment} key={comment._id} />
        ))
      ) : (
        <EmptyData message="Data not found" />
      )}
      <form action={commentAPost}>
        <Textarea
          placeholder="Your Comment"
          variant="outlined"
          rows={2}
          value={text}
          name={`text-${id}`}
          onChange={onChangeHandler}
        />
        <Button
          variant="text"
          className="rounded-full"
          type="submit"
          onClick={() => {
            commentMutation({
              _id: "",
              text,
              Reply: [],
            });
          }}
        >
          send
        </Button>
      </form>
    </>
  );
}
