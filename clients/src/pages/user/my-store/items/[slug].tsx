import ErrorNotification from "@/components/errorNotification";
import Loading from "@/components/loading";
import { DropDown } from "@/components/navbar";
import ItemPage from "@/components/views/item";
import Encryption from "@/helper/encryption";
import { item } from "@/interfaces/store";
import { client } from "@/lib/apolloClient";
import { GETALLSLUG, GETITEMBYSLUG } from "@/queries/store";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const { data } = await client.query({
    query: GETALLSLUG,
  });

  const paths = data.getAllSlug.map((el: { ID: string; Slug: string }) => {
    return {
      params: {
        id: el.ID,
        slug: el.Slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<
  GetStaticPropsResult<{
    item: item | null | undefined;
    error?: { isError?: boolean; message: string; name: string };
  }>
> {
  try {
    const { slug } = context.params as ParsedUrlQuery;

    const { data } = await client.query<{ getItemBySlug: item }>({
      query: GETITEMBYSLUG,
      variables: {
        slug: Encryption.encrypt(slug as string),
      },
    });

    return {
      props: {
        item: data.getItemBySlug,
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
        item: null,
      },
    };
  }
}

const dropdown: DropDown[] = [
  {
    name: "Homepage",
    href: "/",
  },
];

export default function ItemDetails({
  item,
  error,
}: {
  item: item;
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
      <ItemPage item={item} dropdown={dropdown} />
    </>
  );
}
