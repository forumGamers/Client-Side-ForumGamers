"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/material-tailwind";

export default function Modal({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  const handleChange = (open: boolean) => {
    if (!open) router.back();
  };
  return (
    <>
      <Dialog open handler={handleChange}>
        <DialogHeader>Comment Section</DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          {children}
        </DialogBody>
      </Dialog>
    </>
  );
}
