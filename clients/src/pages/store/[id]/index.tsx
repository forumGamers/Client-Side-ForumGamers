import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { store } from "@/interfaces/store";
import StorePage from "@/components/views/store";
import { DropDown } from "@/components/navbar";
import { ParsedUrlQuery } from "querystring";
import { client } from "@/lib/apolloClient";
import { GETALLSTOREID, GETSTOREBYID } from "@/queries/store";
import Encryption from "@/helper/encryption";
import ErrorNotification from "@/components/errorNotification";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult<{ id: string }>> {
  const { data } = await client.query({
    query: GETALLSTOREID,
  });

  const paths = data.getAllStoreId.map((el: { ID: string }) => {
    return {
      params: {
        id: el.ID,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<
  GetStaticPropsResult<{
    store: store | null | undefined;
    error?: {
      name: string;
      message: string;
      isError?: boolean;
    };
  }>
> {
  try {
    const { params } = context;

    const { id } = params as ParsedUrlQuery;

    const { data } = await client.query<{ getStoreByID: store }>({
      query: GETSTOREBYID,
      variables: {
        getStoreByIdId: Encryption.encrypt(id as string),
      },
    });

    return {
      props: {
        store: data.getStoreByID,
      },
    };
  } catch (err) {
    const serverError = new Error(err as string);
    return {
      props: {
        error: {
          isError: true,
          message: serverError.message,
          name: serverError.name,
        },
        store: null,
      },
    };
  }
}

const dropDown: DropDown[] = [
  {
    name: "homePage",
    href: "/",
  },
];

export default function StorePageById({
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
  return (
    <>
      <StorePage store={store} dropDown={dropDown} />
    </>
  );
}
