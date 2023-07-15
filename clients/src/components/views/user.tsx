import { UserData } from "@/interfaces/user";
import { blankBackground, blankProfile, blankStoreImage } from "@/constants";
import { Suspense } from "react";
import Loading from "../loader";
import { LazyLoadImage } from "@/components/global";

export default function UserProfile({ user }: { user: UserData }): JSX.Element {
  return (
    <main className="container">
      <Suspense fallback={<Loading type="bar" />}>
        <div className="coverImage">
          <LazyLoadImage
            loading="lazy"
            src={user?.backgroundImage || blankBackground}
            alt="cover"
            width={100}
            height={24}
          />
        </div>
        <div className="avatar">
          <LazyLoadImage
            loading="lazy"
            src={user?.imageUrl || blankProfile}
            alt="avatar"
            placeholder={<Loading type="bar" />}
          />
        </div>
        {user?.Store?.name ? (
          <div className="store">
            {user?.Store?.image ? (
              <LazyLoadImage
                src={user?.Store?.image}
                alt="store img"
                className="store-img"
                loading="lazy"
                placeholder={<Loading type="bar" />}
              />
            ) : (
              <LazyLoadImage
                src={blankStoreImage}
                alt="store img"
                className="store-img"
                loading="lazy"
                placeholder={<Loading type="bar" />}
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
