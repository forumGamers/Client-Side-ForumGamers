import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";
import { GETUSERDATA } from "@/queries/user";
import { useLazyQuery } from "@apollo/client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/styles/pages/user/index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
const blankProfile =
  "https://ik.imagekit.io/b8ugipzgo/FrontEnd/guest.webp?updatedAt=1679878710354";
const blankBackground =
  "https://ik.imagekit.io/b8ugipzgo/FrontEnd/default_background?updatedAt=1679931892521";
const blackStoreImage =
  "https://ik.imagekit.io/b8ugipzgo/FrontEnd/Placeholder_view_vector.svg.png?updatedAt=1680189187245";

export default function UserProfile(): JSX.Element {
  const router = useRouter();
  const [getUserData, { loading }] = useLazyQuery(GETUSERDATA, {
    onError(error) {
      swalError(error);
    },
    onCompleted(data) {
      const {
        id,
        fullName,
        exp,
        email,
        balance,
        imageUrl,
        isVerified,
        phoneNumber,
        point,
        role,
        username,
        Followings,
        Store,
      } = data.getUserData;

      setUser({
        id,
        fullName,
        email,
        exp,
        balance,
        imageUrl,
        isVerified,
        phoneNumber,
        point,
        role,
        username,
        Followings,
        Store,
      });
    },
  });

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/login");
    },
  }) as any;

  const [user, setUser] = useState({
    id: 0,
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    role: "",
    point: "",
    isVerified: false,
    imageUrl: "",
    balance: 0,
    Store: {} as any,
    exp: 0,
    Followings: [],
  });

  useEffect(() => {
    if (status === "authenticated") {
      (async () => {
        try {
          await getUserData({
            variables: {
              accessToken: session?.user?.access_token,
            },
          });
        } catch (error) {
          swalError(error);
        }
      })();
    }
  }, [status]);

  const s = (e: any) => {
    e.preventDefault();

    signOut();
  };

  if (status === "loading" || loading) return <Loading />;

  return (
    <section className="container">
      <div className="coverImage">
        <LazyLoadImage src={blankBackground} alt="cover" />
      </div>
      <div className="avatar">
        <LazyLoadImage src={user.imageUrl || blankProfile} alt="avatar" />
      </div>
      {user.Store?.name ? (
        <div className="store">
          {user.Store?.image ? (
            <LazyLoadImage
              src={user.Store?.image}
              alt="store img"
              className="store-img"
            />
          ) : (
            <LazyLoadImage
              src={blackStoreImage}
              alt="store img"
              className="store-img"
            />
          )}
          <p>{user.Store?.name}</p>
        </div>
      ) : (
        <div className="store"></div>
      )}
      <div className="userInfo">
        <h1 className="name">{user.username}</h1>
        <span className="username">@{user.username}</span>
        <div className="stats">
          <div className="stat">
            <span className="statLabel">Tweets</span>
            <span className="statValue">user.tweets</span>
          </div>
          <div className="stat">
            <span className="statLabel">Following</span>
            <span className="statValue">{user.Followings.length}</span>
          </div>
          <div className="stat">
            <span className="statLabel">Point</span>
            <span className="statValue">{user.point}</span>
          </div>
          <div className="stat">
            <span className="statLabel">EXP</span>
            <span className="statValue">{user.exp}</span>
          </div>
        </div>
        <div className="bio">testing aja</div>
      </div>
      <button onClick={s}>sign out</button>
    </section>
  );
}
