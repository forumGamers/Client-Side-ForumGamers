"use client";

import { Typography, Button } from "@/components/material-tailwind";
import {
  useState,
  Fragment,
  useRef,
  Dispatch,
  SetStateAction,
  experimental_useOptimistic as useOptimistic,
} from "react";
import CommentCollapse from "../collapse/commentCollapse";
import AvatarProfile from "../avatar/avatarProfile";
import { LoadingOverlay } from "@/components/global";
import { commentAPost } from "@/actions/post";
import { useParams } from "next/navigation";
import { CommentSection, ReplySection } from "@/interfaces/post";
import Reply from "./reply";

export default function CommentCard({
  comment,
  state,
  commentMutation,
  setCommentData,
}: {
  comment: CommentSection;
  state: CommentSection[];
  setCommentData: Dispatch<SetStateAction<CommentSection[]>>;
  commentMutation: (action: {
    data: CommentSection;
    type: "error" | "loading";
    id?: string;
  }) => void;
}): JSX.Element {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  const replyHandler = () => {
    setReply(!reply);
  };
  const collapseHandler = () => {
    setCollapse(!collapse);
  };

  const { id } = useParams() as Record<string, string>;

  const [optimisticReply, replyMutation] = useOptimistic(
    state.find((el) => el._id === id)?.Reply,
    (
      state,
      newReply: {
        data: ReplySection[];
        type: "error" | "loading";
        id?: string;
      }
    ) => {
      const isError = newReply.type === "error";
      const isLoading = newReply.type === "loading";

      switch (true) {
        case isError:
        case isLoading:
        default:
          return state;
      }
    }
  );

  const resendHandler = () => {
    setLimit(limit + 1);

    const text = textRef.current?.innerText as string;

    commentMutation({
      type: "loading",
      data: {
        text,
        Reply: [],
        _id: "",
        isLoading: true,
        User: {
          id: 6,
          UUID: "",
          username: "test",
          imageUrl: "",
        },
      },
    });

    commentAPost({ text, postId: id }).then(({ success, data, user }) => {
      if (!success) {
        commentMutation({
          type: "error",
          data: {
            text,
            Reply: [],
            _id: "",
            isError: true,
            User: {
              id: 6,
              UUID: "",
              username: "test",
              imageUrl: "",
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
        ...state,
      ]);
    });
  };

  return (
    <>
      {comment.isLoading ? (
        <LoadingOverlay active spinner text="loading...">
          <div className="border-2 border-blue-500 p-4">
            <AvatarProfile user={comment.User} />
            <Typography className="font-normal cursor-pointer p-4 mb-4">
              {comment.text}
            </Typography>
          </div>
        </LoadingOverlay>
      ) : (
        <>
          <div
            className={`flex items-center ${
              comment.isError ? "border-red-800 bg-red-800" : ""
            }`}
          >
            <AvatarProfile user={comment.User} />
            <Typography
              className="font-normal cursor-pointer p-4 mb-4"
              ref={textRef}
            >
              {comment.text}
            </Typography>
          </div>
          {comment.isLoading ? null : comment.isError ? (
            <form action={resendHandler}>
              {limit < 3 ? (
                <Button
                  variant="text"
                  className="rounded-full"
                  color="red"
                  type="submit"
                >
                  ReSend ?
                </Button>
              ) : (
                <Button
                  disabled
                  variant="text"
                  className="rounded-full"
                  color="red"
                >
                  Limit reached
                </Button>
              )}
            </form>
          ) : (
            <Button
              variant="text"
              className="rounded-full"
              onClick={collapseHandler}
              color="red"
            >
              Reply
            </Button>
          )}
          {comment.Reply.length ? (
            <Button
              onClick={replyHandler}
              variant="text"
              className="rounded-full"
              color="red"
            >{`See repl${comment.Reply.length > 1 ? "ies" : "y"}`}</Button>
          ) : null}
          <CommentCollapse
            setCommentData={setCommentData}
            commentMutation={commentMutation}
            open={collapse}
            comment={comment}
          />
          <br />
          {reply &&
            comment.Reply.map((el) => (
              <Fragment key={el._id}>
                <Reply reply={el} />
                <br />
              </Fragment>
            ))}
        </>
      )}
    </>
  );
}
