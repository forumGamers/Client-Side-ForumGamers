import ErrorNotification from "@/components/errorNotification";
import { checkSession } from "@/helper/global";
import { CustomSession } from "@/interfaces/tour";
import { UserData } from "@/interfaces/user";
import { client } from "@/lib/apolloClient";
import { GETUSERDATA } from "@/queries/user";
import { NextPageContext } from "next";
import { User } from "next-auth";
import { redirect } from "next/navigation";

async function getUserData(
  session: CustomSession
): Promise<{ user: UserData | null; error: Error | null }> {
  try {
    const { data } = await client.query({
      query: GETUSERDATA,
      variables: {
        accessToken: session?.user?.access_token,
      },
      fetchPolicy: "cache-first",
    });
    return {
      user: data.getUserData,
      error: null,
    };
  } catch (err) {
    const fetchError = new Error(err as string);
    return {
      user: null,
      error: fetchError,
    };
  }
}

export default async function UserPage(
  ctx: NextPageContext
): Promise<JSX.Element> {
  let userSession: CustomSession | unknown = null;
  await checkSession(ctx, (session) => {
    if (!session) redirect("/login");
    userSession = session;
  });
  const { user, error } = await getUserData(userSession as CustomSession);

  function onCloseHandler() {
    window.location.reload();
  }

  if (!user)
    return (
      <ErrorNotification
        name={error?.name}
        message={error?.message as string}
        onClose={onCloseHandler}
      />
    );
  return (
    <>
      <div>ok</div>
    </>
  );
}
