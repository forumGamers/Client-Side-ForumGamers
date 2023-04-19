import { client } from "@/lib/apolloClient";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CardAchievement from "@/components/cardAchievement";
import { getDataFromTree } from "@apollo/client/react/ssr";
import ErrorNotification from "@/components/errorNotification";
import { GetServerSidePropsContext } from "next";
import { GETUSERACHIEVEMENT } from "@/queries/user";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<any> {
  try {
    const session = (await getSession(context)) as any;
    console.log(session, "<><>");

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
        access_token: session?.user.access_token,
      },
    });
    console.log(data, "<<<<");

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
        },
      },
    };
  }
}

export default function AchievementPage({
  data,
  error,
}: {
  data: any;
  error: Error;
}): JSX.Element {
  const router = useRouter();
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });
  const [achievements, setAchievements] = useState([]);

  if (error) setNotification({ message: error.message, show: true });

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
      {achievements.length > 0 ? (
        achievements.forEach((achievement) => {
          <CardAchievement achievement={achievement} />;
        })
      ) : (
        <div>empty</div>
      )}
    </>
  );
}
