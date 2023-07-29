"use client";

import {
  Collapse,
  Card,
  CardBody,
  Textarea,
} from "@/components/material-tailwind";
import { useState } from "react";

export default function CommentCollapse({
  open,
}: {
  open: boolean;
}): JSX.Element {
  const [text, setText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <Collapse open={open}>
      <Card className="my-4 mx-auto w-8/12">
        <CardBody>
          <form>
            <Textarea
              placeholder="Your Comment"
              variant="outlined"
              rows={8}
              value={text}
              name="text"
              onChange={onChangeHandler}
            />
          </form>
        </CardBody>
      </Card>
    </Collapse>
  );
}
