import { GETUSERDATA } from "@/queries/user";
import { signOut, getSession } from "next-auth/react";
import "@/styles/pages/user/index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserData } from "@/interfaces/user";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from "next";
import { CustomSession } from "@/interfaces/tour";
import { client } from "@/lib/apolloClient";
import { blackStoreImage, blankBackground, blankProfile } from "@/constants";
import ErrorNotification from "@/components/errorNotification";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/loading";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    data: UserData | null | undefined;
    redirect?: Redirect;
    error?: {
      name: string;
      message: string;
      isError?: boolean;
    };
  }>
> {
  try {
    const session: CustomSession | null = await getSession(context);

    if (!session || !session?.user)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };

    const { data } = await client.query({
      query: GETUSERDATA,
      variables: {
        accessToken: session?.user?.access_token,
      },
      fetchPolicy: "cache-first",
    });

    return {
      props: {
        data: data.getUserData,
      },
    };
  } catch (err) {
    const errors = new Error(err as string);
    return {
      props: {
        data: null,
        error: {
          isError: true,
          message: errors.message,
          name: errors.name,
        },
      },
    };
  }
}

export default function UserProfile({
  data: user,
  error,
}: {
  data: UserData;
  error?: {
    name: string;
    message: string;
    isError?: boolean;
  };
}): JSX.Element {
  const s = (e: any) => {
    e.preventDefault();

    signOut();
  };

  const router = useRouter();
  const [notification, setNotification] = useState(false);

  if (router.isFallback) return <Loading />;

  function handleReload() {
    setNotification(false);
    window.location.reload();
  }

  if (error?.isError) setNotification(true);

  if (notification)
    return (
      <ErrorNotification
        message={error?.message as string}
        onClose={handleReload}
      />
    );

  return (
    <section className="container">
      <div className="coverImage">
        <LazyLoadImage src={blankBackground} alt="cover" />
      </div>
      <div className="avatar">
        <LazyLoadImage src={user?.imageUrl || blankProfile} alt="avatar" />
      </div>
      {user?.Store?.name ? (
        <div className="store">
          {user?.Store?.image ? (
            <LazyLoadImage
              src={user?.Store?.image}
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
      <button onClick={s}>sign out</button>
    </section>
  );
}
