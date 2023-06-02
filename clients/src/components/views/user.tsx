import { UserData } from "@/interfaces/user";
import Navbar, { DropDown } from "../navbar";
import Image from "next/image";
import { blankBackground, blankProfile, blankStoreImage } from "@/constants";

export default function UserProfile({
  user,
  dropdown,
}: {
  user: UserData;
  dropdown: DropDown[];
}): JSX.Element {
  return (
    <>
      <Navbar isLoggedUser={true} dropdown={dropdown} />
      <div className="coverImage">
        <Image src={user?.backgroundImage || blankBackground} alt="cover" />
      </div>
      <div className="avatar">
        <Image src={user?.imageUrl || blankProfile} alt="avatar" />
      </div>
      {user?.Store?.name ? (
        <div className="store">
          {user?.Store?.image ? (
            <Image
              src={user?.Store?.image}
              alt="store img"
              className="store-img"
            />
          ) : (
            <Image
              src={blankStoreImage}
              alt="store img"
              className="store-img"
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
    </>
  );
}
