"use client";

import { Avatar, Typography } from "@/components/material-tailwind";
import { blankProfile } from "@/constants";
import { useRouter } from "next/navigation";

export default function AvatarProfile({
  user,
}: {
  user: { username: string; id: number | string; image?: string; UUID: string };
}): JSX.Element {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src={user.image ?? blankProfile}
        variant="circular"
        alt="profile-picture"
        className="cursor-pointer"
        onClick={() => {
          router.push(`/user/${user.UUID}`);
        }}
      />
      <Typography variant="h6">{user.image}</Typography>
    </div>
  );
}
