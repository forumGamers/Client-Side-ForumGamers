import StoreSection from "@/components/views/storeSection";
import { StorePageQuery, storeData } from "@/interfaces/store";
import { client } from "@/lib/apolloClient";
import { GETSTOREDATAFORSTOREPAGE } from "@/queries/store";

async function getInitialData(
  query: StorePageQuery
): Promise<{ store: storeData[] }> {
  try {
    const { data } = await client.query<{ getAllStore: storeData[] }>({
      query: GETSTOREDATAFORSTOREPAGE,
      variables: {
        query,
      },
    });

    return { store: data.getAllStore };
  } catch (err) {
    throw new Error(err as string);
  }
}

export default async function Page(): Promise<JSX.Element> {
  const { store } = await getInitialData({
    active: "true",
    page: "1",
    limit: "12",
  });
  return <StoreSection stores={store} />;
}
