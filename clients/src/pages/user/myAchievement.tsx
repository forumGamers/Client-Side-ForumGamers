import { client } from "@/lib/apolloClient";
import { getSession } from "next-auth/react";
import { useState } from "react";
import CardAchievement from "@/components/cardAchievement";
import ErrorNotification from "@/components/errorNotification";
import { GetServerSidePropsContext } from "next";
import { GETUSERACHIEVEMENT } from "@/queries/tour";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<any> {
  try {
    const session = (await getSession(context)) as any;

    if (!session) {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    const { data } = await client.query({
      query: GETUSERACHIEVEMENT,
      variables: {
        accessToken: session?.user.access_token,
      },
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
        },
      },
    };
  }
}

export default function AchievementPage({
  data,
  error,
}: {
  data: any[];
  error: Error;
}): JSX.Element {
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });

  // if (error) setNotification({ message: error.message, show: true });

  {
    notification.show && (
      <ErrorNotification
        message={notification.message}
        onClose={() => setNotification({ message: "", show: false })}
      />
    );
  }

  return (
    <>
      {data.length ? (
        data.map((el: any) => {
          return <CardAchievement achievement={el} key={el.id} />;
        })
      ) : (
        <div>empty</div>
      )}
    </>
  );
}
