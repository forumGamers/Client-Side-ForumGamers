"use client";

import { Typography, Button } from "@/components/material-tailwind";
import { useState, Fragment } from "react";
import CommentCollapse from "../collapse/commentCollapse";
import AvatarProfile from "../avatar/avatarProfile";
import { LoadingOverlay } from "@/components/global";

type CommentSection = {
  text: string;
  Reply: { text: string; _id: string }[];
  _id: string;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};

export default function CommentCard({
  comment,
}: {
  comment: CommentSection;
}): JSX.Element {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);

  const replyHandler = () => {
    setReply(!reply);
  };
  const collapseHandler = () => {
    setCollapse(!collapse);
  };
  return (
    <>
      {comment.isLoading ? (
        <LoadingOverlay active spinner text="loading...">
          <div className="border-2 border-blue-500 p-4">
            <AvatarProfile user={{ username: "", UUID: "", id: 1 }} />
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
            <AvatarProfile user={{ username: "", UUID: "", id: 1 }} />
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
                  <AvatarProfile user={{ username: "", UUID: "", id: 1 }} />
                  <Typography className="font-normal cursor-pointer">
                    {el.text}
                  </Typography>
                </div>
                <br />
              </Fragment>
            ))}
        </>
      )}
    </>
  );
}
