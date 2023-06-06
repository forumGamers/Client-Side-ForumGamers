import ErrorNotification from "@/components/errorNotification";
import StorePage from "@/components/views/store";
import { checkServerSession } from "@/helper/global";
import { storeData } from "@/interfaces/store";
import { CustomSession } from "@/interfaces/tour";
import { client } from "@/lib/apolloClient";
import { GETUSERSTORE } from "@/queries/store";
import { redirect } from "next/navigation";

async function getStoreData(
  session: CustomSession
): Promise<{
  store: storeData | null;
  error: Error | null;
}> {
  try {
    const { data } = await client.query<{ getUserStore: storeData }>({
      query: GETUSERSTORE,
      context: {
        headers: {
          access_token: session?.user?.access_token,
        },
      },
      fetchPolicy: "cache-first",
    });

    return {
      error: null,
      store: data.getUserStore,
    };
  } catch (err) {
    const fetchError = new Error(err as string);
    return {
      store: null,
      error: fetchError,
    };
  }
}

export default async function UserStore(): Promise<JSX.Element> {
  let userSession: CustomSession | unknown = null;
  await checkServerSession((session) => {
    if (!session) redirect("/login");
    userSession = session;
  });
  const { store, error } = await getStoreData(userSession as CustomSession);

  if (!store)
    return (
      <ErrorNotification
        message={error?.message || "Something Went wrong"}
        name={error?.name || "Internal Server Error"}
        onClose={() => window.location.reload()}
      />
    );
  return <StorePage store={store as storeData} dropDown={[]} />;
}
