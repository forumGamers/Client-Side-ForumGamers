import ErrorNotification from "@/components/errorNotification";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import { DropDown } from "@/components/navbar";
import { blankStoreImage } from "@/constants";
import { store } from "@/interfaces/store";
import { CustomSession } from "@/interfaces/tour";
import { client } from "@/lib/apolloClient";
import { GETUSERSTORE } from "@/queries/store";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    data: store | null | undefined;
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
        access_token: session.user.access_token,
      },
      fetchPolicy: "cache-first",
    });
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: null,
        error: {
          message: "Failed to fetch",
          name: "Failed to fetch",
          isError: true,
        },
      },
    };
  }
}

const dropDown: DropDown[] = [
  {
    name: "s",
    href: "/s",
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

  // if (error && error.isError) setNotification(true);

  function handleError() {
    setNotification(false);
    window.location.reload();
  }

  if (notification)
    return <ErrorNotification message={error.message} onClose={handleError} />;
  return (
    <>
      <Navbar isLoggedUser={true} dropdown={dropDown} />
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <LazyLoadImage src={store?.image || blankStoreImage} alt="Store" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{store?.name}</h2>
          <p>{store?.description || ""}</p>
        </div>
      </div>
    </>
  );
}
