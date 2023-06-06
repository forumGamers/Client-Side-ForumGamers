import { DropDown } from "@/components/navbar";
import UserProfile from "@/components/views/user";
import { checkServerSession } from "@/helper/global";
import { CustomSession } from "@/interfaces/tour";
import { UserData } from "@/interfaces/user";
import { client } from "@/lib/apolloClient";
import { GETUSERDATA } from "@/queries/user";
import { redirect } from "next/navigation";

async function getUserData(
  session: CustomSession
): Promise<{ user: UserData | null; error: Error | null }> {
  try {
    const { data } = await client.query<{ getUserData: UserData }>({
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
    throw fetchError;
  }
}

const dropdown: DropDown[] = [
  {
    href: "/",
    name: "Homepage",
  },
  {
    href: "/user/my-store",
    name: "store",
  },
  {
    href: "/user/myAchievement",
    name: "achievement",
  },
];

export default async function UserPage(): Promise<JSX.Element> {
  let userSession: CustomSession | unknown = null;
  await checkServerSession((session) => {
    if (!session) redirect("/login");
    userSession = session;
  });
  const { user } = await getUserData(userSession as CustomSession);

  return <UserProfile user={user as UserData} dropdown={dropdown} />;
}
