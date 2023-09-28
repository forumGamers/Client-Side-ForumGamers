"use client";

import { experimental_useOptimistic as useOptimistic, useState } from "react";
import dinamic from "next/dynamic";
import Loading from "@/components/loader";
import EmptyData from "@/components/emptyData";
import { Button, Textarea } from "@/components/material-tailwind";
import { commentAPost } from "@/actions/post";
import { useParams } from "next/navigation";
import { CommentSection } from "@/interfaces/post";
const CommentCard = dinamic(() => import("@/components/card/comment"), {
  loading: () => <Loading />,
});

export default function Wrapper({
  comment,
}: {
  comment: CommentSection[];
}): JSX.Element {
  const [commentData, setCommentData] = useState<CommentSection[]>(comment);
  const [optimisticComment, commentMutation] = useOptimistic(
    commentData,
    (
      state,
      newComment: {
        data: CommentSection;
        type: "error" | "loading";
        id?: string;
      }
    ) => {
      const isError = newComment.type === "error";
      const isLoading = newComment.type === "loading";

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

  const actionHandler = async (formData: FormData) => {
    const [formName] = Array.from<string>(formData.keys());
    const [_, postId] = formName.split("-");

    const text = formData.get(formName) as string;

    commentMutation({
      type: "loading",
      data: {
        text,
        Reply: [],
        _id: "",
        isLoading: true,
        User: {
          id: 0,
          UUID: "",
          username: "",
          imageUrl: "",
        },
      },
    });

    commentAPost({ text, postId }).then(({ data, success, user }) => {
      setText("");

      if (!success) {
        commentMutation({
          type: "error",
          data: {
            text,
            Reply: [],
            _id: "",
            isError: true,
            User: {
              ...user,
              imageUrl: user.image,
            },
          },
        });
        return;
      }

      setCommentData([
        {
          text,
          Reply: [],
          _id: data.id,
          isSuccess: true,
          User: {
            ...user,
            imageUrl: user.image,
          },
        },
        ...commentData,
      ]);
    });
  };

  return (
    <>
      {optimisticComment.length ? (
        optimisticComment.map((comment, idx) => (
          <CommentCard
            comment={comment}
            key={idx}
            commentMutation={commentMutation}
            setCommentData={setCommentData}
            state={commentData}
          />
        ))
      ) : (
        <EmptyData message="Theres no commentar yet,add comment" />
      )}
      <form
        action={actionHandler}
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
