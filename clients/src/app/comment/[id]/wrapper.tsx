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
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};

export default function Wrapper({
  comment,
}: {
  comment: CommentSection[];
}): JSX.Element {
  const [optimisticComment, commentMutation] = useOptimistic(
    comment,
    (
      state,
      newComment: {
        data: CommentSection;
        type: "success" | "error" | "loading";
        id?: string;
      }
    ) => {
      const isError = newComment.type === "error";
      const isLoading = newComment.type === "loading";
      const isSuccess = newComment.type === "success";

      switch (true) {
        case isError:
          return [
            {
              ...newComment.data,
              isError: true,
            },
            ...state,
          ];
        case isLoading:
          return state.length ? [newComment.data, ...state] : [newComment.data];
        case isSuccess:
          return state.map((el) => (!el._id ? { ...el, _id: id } : el));
        default:
          return state;
      }
    }
  );

  const [text, setText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { id } = useParams() as Record<string, string>;

  return (
    <>
      {optimisticComment.length ? (
        optimisticComment.map((comment, idx) => (
          <CommentCard comment={comment} key={idx} />
        ))
      ) : (
        <EmptyData message="Theres no commentar yet,add comment" />
      )}
      <form
        action={async (formData) => {
          const [formName] = Array.from<string>(formData.keys());

          const text = formData.get(formName) as string;

          commentMutation({
            type: "loading",
            data: {
              text,
              Reply: [],
              _id: "",
              isLoading: true,
            },
          });

          commentAPost(formData).then(({ data, success }) => {
            if (!success) {
              commentMutation({
                type: "error",
                data: {
                  text,
                  Reply: [],
                  _id: "",
                  isError: true,
                },
              });
              return;
            }
            commentMutation({
              type: "success",
              data: {
                text,
                Reply: [],
                _id: id,
                isSuccess: true,
              },
              id: data.id,
            });
          });
        }}
        className="sticky bottom-0 p-4"
        style={{ width: "calc(100% - 2rem)" }}
      >
        <Textarea
          placeholder="Your Comment"
          variant="outlined"
          rows={2}
          value={text}
          name={`text-${id}`}
          onChange={onChangeHandler}
        />
        <Button variant="text" className="rounded-full" type="submit">
          send
        </Button>
      </form>
    </>
  );
}
