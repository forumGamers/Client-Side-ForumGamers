import { UserData } from "@/interfaces/user";
import Image from "next/image";
import { blankBackground, blankProfile, blankStoreImage } from "@/constants";
import { Suspense } from "react";
import Loading from "../loading1";

export default function UserProfile({ user }: { user: UserData }): JSX.Element {
  return (
    <main className="container">
      <Suspense fallback={<Loading />}>
        <div className="coverImage">
          <Image
            loading="lazy"
            src={user?.backgroundImage || blankBackground}
            alt="cover"
            width={100}
            height={24}
          />
        </div>
        <div className="avatar">
          <Image
            loading="lazy"
            src={user?.imageUrl || blankProfile}
            alt="avatar"
            width={100}
            height={24}
          />
        </div>
        {user?.Store?.name ? (
          <div className="store">
            {user?.Store?.image ? (
              <Image
                src={user?.Store?.image}
                alt="store img"
                className="store-img"
                loading="lazy"
                width={100}
                height={24}
              />
            ) : (
              <Image
                src={blankStoreImage}
                alt="store img"
                className="store-img"
                loading="lazy"
                width={100}
                height={24}
              />
            )}
            <p>{user?.Store?.name}</p>
          </div>
        ) : (
          <div className="store"></div>
        )}
        <div className="userInfo">
          <h1 className="name">{user?.username}</h1>
          <span className="username">@{user?.username}</span>
          <div className="stats">
            <div className="stat">
              <span className="statLabel">Tweets</span>
              <span className="statValue">user.tweets</span>
            </div>
            <div className="stat">
              <span className="statLabel">Following</span>
              <span className="statValue">{user?.Followings?.length || 0}</span>
            </div>
            <div className="stat">
              <span className="statLabel">Point</span>
              <span className="statValue">{user?.point || 0}</span>
            </div>
            <div className="stat">
              <span className="statLabel">EXP</span>
              <span className="statValue">{user?.exp || 0}</span>
            </div>
          </div>
          <div className="bio">testing aja</div>
        </div>
      </Suspense>
    </main>
  );
}
