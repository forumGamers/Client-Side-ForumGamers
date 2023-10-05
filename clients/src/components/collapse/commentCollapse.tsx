"use client";

import { ReplyComment } from "@/actions/post";
import {
  Collapse,
  Card,
  CardBody,
  Textarea,
  Button,
} from "@/components/material-tailwind";
import { CommentSection } from "@/interfaces/post";
import { Dispatch, SetStateAction, useState } from "react";

export default function CommentCollapse({
  open,
  comment,
  commentMutation,
  setCommentData,
}: {
  open: boolean;
  comment: CommentSection;
  setCommentData: Dispatch<SetStateAction<CommentSection[]>>;
  commentMutation: (action: {
    data: CommentSection;
    type: "error" | "loading";
    id?: string;
  }) => void;
}): JSX.Element {
  const [text, setText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const actionHandler = async (formData: FormData) => {
    const text = formData.get("text") as string;

    commentMutation({
      type: "loading",
      data: {
        ...comment,
        Reply: [
          ...comment.Reply,
          {
            text,
            _id: "",
            isLoading: true,
            User: {
              id: 6,
              UUID: "",
              username: "test",
              imageUrl: "",
            },
          },
        ],
      },
    });

    ReplyComment({
      text,
      commentId: comment._id,
    }).then(({ success, data, user }) => {
      if (!success) {
        commentMutation({
          type: "error",
          data: {
            ...comment,
            Reply: [
              ...comment.Reply,
              {
                text,
                _id: data.id,
                isLoading: true,
                User: {
                  ...user,
                  imageUrl: user.image,
                },
              },
            ],
          },
        });
        return;
      }

      setCommentData((prev) =>
        prev.map((el) =>
          el._id === comment._id
            ? {
                ...el,
                Reply: [
                  ...el.Reply,
                  {
                    text,
                    _id: data.id,
                    isLoading: true,
                    User: {
                      ...user,
                      imageUrl: user.image,
                    },
                  },
                ],
              }
            : el
        )
      );
    });
  };

  return (
    <Collapse open={open}>
      <Card className="my-4 mx-auto w-8/12">
        <CardBody>
          <form action={actionHandler}>
            <Textarea
              placeholder="Your Comment"
              variant="outlined"
              rows={8}
              value={text}
              name="text"
              onChange={onChangeHandler}
            />
            <Button variant="text" className="rounded-full" type="submit">
              send
            </Button>
          </form>
        </CardBody>
      </Card>
    </Collapse>
  );
}
