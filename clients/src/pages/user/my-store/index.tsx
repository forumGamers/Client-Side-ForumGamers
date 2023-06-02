import ErrorNotification from "@/components/errorNotification";
import Loading from "@/components/loading";
import { DropDown } from "@/components/navbar";
import StorePage from "@/components/views/store";
import { store } from "@/interfaces/store";
import { CustomSession } from "@/interfaces/tour";
import { client } from "@/lib/apolloClient";
import { GETUSERSTORE } from "@/queries/store";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
  NextPageContext
} from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    store: store | null | undefined;
    redirect?: Redirect;
    error?: { name: string; message: string; isError?: boolean };
  }>
> {
  try {
    const session: CustomSession | null = await getSession(context);

    if (!session || !session.user?.access_token)
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };

    const { data } = await client.query({
      query: GETUSERSTORE,
      context: {
        headers: {
          access_token: session.user.access_token,
        },
      },
      fetchPolicy: "cache-first",
    });

    return {
      props: {
        store: data.getUserStore,
      },
    };
  } catch (err) {
    const error = new Error(err as string);
    return {
      props: {
        store: null,
        error: {
          isError: true,
          message: error.message,
          name: error.name,
        },
      },
    };
  }
}

const dropDown: DropDown[] = [
  {
    name: "Homepage",
    href: "/",
  },
  {
    name: "profile",
    href: "/user",
  },
  {
    name: "achievement",
    href: "/user/myAchievement",
  },
];

export default function MyStore({
  store,
  error,
}: {
  store: store;
  error: {
    message: string;
    name: string;
    isError?: boolean;
  };
}): JSX.Element {
  const [notification, setNotification] = useState(false);
  const router = useRouter();

  if (router.isFallback) return <Loading />;

  if (error && error.isError) setNotification(true);

  function handleError() {
    setNotification(false);
    window.location.reload();
  }

  if (notification)
    return (
      <ErrorNotification
        name={error.name}
        message={error.message}
        onClose={handleError}
      />
    );
  return <StorePage dropDown={dropDown} store={store} />;
}
