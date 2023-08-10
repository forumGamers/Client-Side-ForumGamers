"use client";

import { Collapse, Textarea, Button } from "@/components/material-tailwind";
import { ReplySection } from "@/interfaces/post";
import { useState } from "react";

export default function ReplyCollapse({
  open,
  actionHandler,
  resendHandler,
  reply,
  limit,
}: {
  open: boolean;
  actionHandler: (formdata: FormData) => Promise<void>;
  resendHandler: () => Promise<void>;
  reply: ReplySection;
  limit: number;
}): JSX.Element {
  const [text, setText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <Collapse open={open}>
      <form action={reply.isError ? resendHandler : actionHandler}>
        <Textarea
          placeholder="Your Comment"
          variant="outlined"
          rows={8}
          value={text}
          name="text"
          onChange={onChangeHandler}
        />
        {reply.isError ? (
          <Button
            variant="text"
            className="rounded-full"
            color="red"
            type="submit"
            disabled={limit > 3}
          >
            {limit > 3 ? "Limit reached" : "ReSend ?"}
          </Button>
        ) : (
          <Button
            variant="text"
            className="rounded-full"
            color="red"
            type="submit"
          >
            send
          </Button>
        )}
      </form>
    </Collapse>
  );
}
