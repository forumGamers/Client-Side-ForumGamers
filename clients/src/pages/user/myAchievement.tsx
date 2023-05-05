import { client } from "@/lib/apolloClient";
import { getSession } from "next-auth/react";
import CardAchievement, { achievement } from "@/components/cardAchievement";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from "next";
import { GETUSERACHIEVEMENT } from "@/queries/tour";
import { CustomSession } from "@/interfaces/tour";
import ErrorNotification from "@/components/errorNotification";
import EmptyData from "@/components/emptyData";
import { useState } from "react";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    data: achievement[] | null;
    error?: {
      name: string;
      message?: string;
      isError?: boolean;
    };
    redirect?: Redirect;
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
      query: GETUSERACHIEVEMENT,
      variables: {
        accessToken: session?.user?.access_token,
      },
      fetchPolicy: "cache-first",
    });

    return {
      props: {
        data: data.getUserAchievement,
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

export default function AchievementPage({
  data,
  error,
}: {
  data: achievement[];
  error: {
    name: string;
    message: string;
    isError?: boolean;
  };
}): JSX.Element {
  const [notification, setNotification] = useState(false);

  function handleError() {
    setNotification(false);
    window.location.reload();
  }

  if (notification)
    return <ErrorNotification message={error.message} onClose={handleError} />;

  if (error?.isError) setNotification(true);

  return (
    <>
      {data?.length ? (
        data.map((el: achievement) => (
          <CardAchievement achievement={el} key={el.id} />
        ))
      ) : (
        <EmptyData message="You have not achievement yet" />
      )}
    </>
  );
}
