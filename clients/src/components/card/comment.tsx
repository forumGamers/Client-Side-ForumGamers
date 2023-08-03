"use client";

import { Typography, Button, Avatar } from "@/components/material-tailwind";
import { useState, Fragment } from "react";
import CommentCollapse from "../collapse/commentCollapse";
import { blankProfile } from "@/constants";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type CommentSection = {
  text: string;
  Reply: { text: string; _id: string }[];
  _id: string;
};

export default function CommentCard({
  comment,
}: {
  comment: CommentSection;
}): JSX.Element {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const { pending } = useFormStatus();

  const replyHandler = () => {
    setReply(!reply);
  };
  const collapseHandler = () => {
    setCollapse(!collapse);
  };
  return (
    <>
      <div className="flex items-center">
        <Avatar
          size="md"
          variant="circular"
          src={blankProfile}
          alt="profile-picture"
          className="cursor-pointer"
        />
        <Typography className="font-normal cursor-pointer p-4 mb-4">
          {comment.text}
        </Typography>
      </div>
      <Button
        variant="text"
        className="rounded-full"
        onClick={collapseHandler}
        color="red"
      >
        Reply
      </Button>
      {comment.Reply.length && (
        <Button
          onClick={replyHandler}
          variant="text"
          className="rounded-full"
          color="red"
        >{`See repl${comment.Reply.length > 1 ? "ies" : "y"}`}</Button>
      )}
      <CommentCollapse open={collapse} />
      <br />
      {reply &&
        comment.Reply.map((el) => (
          <Fragment key={el._id}>
            <div className="flex items-center ml-8 pl-4">
              <Avatar
                size="md"
                variant="circular"
                src={blankProfile}
                alt="profile-picture"
                className="cursor-pointer"
              />
              <Typography className="font-normal cursor-pointer">
                {el.text}
              </Typography>
            </div>
            <br />
          </Fragment>
        ))}
    </>
  );
}
