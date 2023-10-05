"use client";

import { ReplySection } from "@/interfaces/post";
import AvatarProfile from "../avatar/avatarProfile";
import { Button, Typography } from "@/components/material-tailwind";
import { LoadingOverlay } from "@/components/global";
import { useState, RefObject } from "react";
import ReplyCollapse from "../collapse/replyCollapse";

export default function Reply({
  reply,
  actionHandler,
  resendHandler,
  textRef,
  replyLimit,
}: {
  reply: ReplySection;
  actionHandler: (formdata: FormData) => Promise<void>;
  resendHandler: () => Promise<void>;
  textRef: RefObject<HTMLParagraphElement>;
  replyLimit: number;
}): JSX.Element {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const openFormHandler = () => {
    setOpenForm(!openForm);
  };

  return (
    <>
      <LoadingOverlay spinner text="loading..." active={reply.isLoading}>
        <div
          className={`flex items-center ml-8 pl-4 ${
            reply.isError
              ? "border-red-800 bg-red-800"
              : reply.isLoading
              ? "border-2 border-blue-500"
              : ""
          }`}
        >
          <AvatarProfile user={reply.User} />
          <Typography className="font-normal cursor-pointer" ref={textRef}>
            {reply.text}
          </Typography>
        </div>
      </LoadingOverlay>
      <Button
        type="button"
        onClick={openFormHandler}
        variant="text"
        className="rounded-full"
        color="red"
      >
        {openForm ? "close" : "reply"}
      </Button>
      {!reply.isLoading && (
        <ReplyCollapse
          open={openForm}
          actionHandler={actionHandler}
          resendHandler={resendHandler}
          reply={reply}
          limit={replyLimit}
        />
      )}
      <br />
    </>
  );
}
