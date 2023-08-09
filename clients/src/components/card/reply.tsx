"use client";

import { ReplySection } from "@/interfaces/post";
import AvatarProfile from "../avatar/avatarProfile";
import { Button, Typography } from "@/components/material-tailwind";
import { LoadingOverlay } from "@/components/global";
import { useState, useRef } from "react";

export default function Reply({ reply }: { reply: ReplySection }): JSX.Element {
  const [limit, setLimit] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  return (
    <>
      {reply.isLoading ? (
        <LoadingOverlay active spinner text="loading...">
          <div className="border-2 border-blue-500 p-4">
            <AvatarProfile user={reply.User} />
            <Typography className="font-normal cursor-pointer p-4 mb-4">
              {reply.text}
            </Typography>
          </div>
        </LoadingOverlay>
      ) : (
        <>
          <div
            className={`flex items-center ml-8 pl-4 ${
              reply.isError ? "border-red-800 bg-red-800" : ""
            }`}
          >
            <AvatarProfile user={reply.User} />
            <Typography className="font-normal cursor-pointer" ref={textRef}>
              {reply.text}
            </Typography>
          </div>
          {reply.isLoading
            ? null
            : reply.isError && (
                <form>
                  <Button
                    variant="text"
                    className="rounded-full"
                    color="red"
                    type="submit"
                    disabled={limit > 3}
                  >
                    {limit > 3 ? "Limit reached" : "ReSend ?"}
                  </Button>
                </form>
              )}
        </>
      )}
    </>
  );
}
