import CardAchievement, {
  achievement,
} from "@/components/card/cardAchievement";
import EmptyData from "@/components/emptyData";
import { checkServerSession } from "@/helper/global";
import { CustomSession } from "@/interfaces/tour";
import { client } from "@/lib/apolloClient";
import { GETUSERACHIEVEMENT } from "@/queries/tour";
import { redirect } from "next/navigation";

async function getData(
  session: CustomSession
): Promise<{ data: achievement[] | null; error: Error | null }> {
  try {
    const { data } = await client.query<{ getUserAchievement: achievement[] }>({
      query: GETUSERACHIEVEMENT,
      context: {
        headers: {
          access_token: session?.user?.access_token,
        },
      },
      fetchPolicy: "cache-first",
    });

    return {
      data: data.getUserAchievement,
      error: null,
    };
  } catch (err) {
    const fetchError = new Error(err as string);
    throw fetchError;
  }
}

export default async function AchievementPage(): Promise<JSX.Element> {
  let userSession: CustomSession | unknown = null;
  await checkServerSession((session) => {
    if (!session) redirect("/login");
    userSession = session;
  });
  const { data } = await getData(userSession as CustomSession);

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
