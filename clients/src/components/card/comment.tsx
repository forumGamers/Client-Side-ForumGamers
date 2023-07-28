"use client";

import { comment } from "@/interfaces/post";
import { useRouter } from "next/navigation";

export default function CommentCard({
  comment,
}: {
  comment: comment;
}): JSX.Element {
  const router = useRouter();
  return (
    <>
      <div>{comment.text}</div>
      {comment.Reply.map((el) => (
        <>{el.text}</>
      ))}
      <button
        onClick={() => {
          router.back();
        }}
      >
        back
      </button>
    </>
  );
}
