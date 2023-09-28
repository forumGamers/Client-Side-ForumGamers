"use client";

import { followUser, unFollowUser } from "@/actions/user";
import {
  Avatar,
  Typography,
  Popover,
  PopoverContent,
  PopoverHandler,
  Button,
} from "@/components/material-tailwind";
import { blankBackground, blankProfile } from "@/constants";
import Encryption from "@/helper/encryption";
import { userProfile } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import { useState, experimental_useOptimistic as useOptimistic } from "react";
import { useSession } from "next-auth/react";
import { LoadingOverlay } from "../global";

export default function AvatarProfile({
  user,
  onSuccessUpdate,
  onRejectUpdate,
}: {
  user: userProfile;
  onSuccessUpdate?: () => void;
  onRejectUpdate?: () => void;
}): JSX.Element {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const { data: session, status } = useSession();

  const triggers = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
  };

  const [optimisticFollow, optimisticMutation] = useOptimistic(
    user.isfollowed,
    (state) => !state
  );

  return (
    <Popover open={open} handler={setOpen}>
      <PopoverHandler {...triggers}>
        <div className="flex items-center gap-4">
          <Avatar
            src={user?.imageUrl || blankProfile}
            variant="circular"
            alt="profile-picture"
            className="cursor-pointer"
            onClick={() => {
              router.prefetch(`/user/${user.UUID}`);
            }}
          />
          <Typography variant="h6">{user.username}</Typography>
        </div>
      </PopoverHandler>
      <PopoverContent
        className="z-50 max-w-[24rem] mb-2 relative"
        {...triggers}
      >
        <div
          className="mb-2 flex items-center gap-4"
          style={{
            backgroundImage: `url(${user?.backgroundImage || blankBackground})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            paddingTop: "25%",
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Avatar
            src={user?.imageUrl || blankProfile}
            variant="circular"
            alt="profile-picture"
            className="cursor-pointer"
          />
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 flex items-center gap-2 font-medium"
          >
            {user.username}
          </Typography>
          <LoadingOverlay active={status === "loading"} spinner>
            <Button
              className="cursor-pointer ml-0"
              type="button"
              variant={optimisticFollow ? "outlined" : "filled"}
              onClick={async () => {
                optimisticMutation(optimisticFollow);
                session === null
                  ? router.push("/login")
                  : optimisticFollow
                  ? await followUser(
                      Encryption.encrypt(user.id.toString())
                    ).then(({ success }) => {
                      if (!success) optimisticMutation(optimisticFollow);
                      if (typeof onSuccessUpdate === "function")
                        onSuccessUpdate();
                    })
                  : await unFollowUser(
                      Encryption.encrypt(user.id.toString())
                    ).then(({ success }) => {
                      if (!success) optimisticMutation(optimisticFollow);
                      if (typeof onRejectUpdate === "function")
                        onRejectUpdate();
                    });
              }}
            >
              {optimisticFollow ? "UnFollow" : "Follow"}
            </Button>
          </LoadingOverlay>
        </div>
        <Typography variant="h6">{user.bio || ""}</Typography>
      </PopoverContent>
    </Popover>
  );
}
