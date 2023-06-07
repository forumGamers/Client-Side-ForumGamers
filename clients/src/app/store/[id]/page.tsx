import { DropDown } from "@/components/navbar";
import StorePage from "@/components/views/store";
import Encryption from "@/helper/encryption";
import { storeData } from "@/interfaces/store";
import { client } from "@/lib/apolloClient";
import { GETSTOREBYID } from "@/queries/store";

async function getData(
  id: string
): Promise<{
  store: storeData | null;
  error: Error | null;
}> {
  try {
    const { data } = await client.query<{ getStoreByID: storeData }>({
      query: GETSTOREBYID,
      variables: {
        getStoreByIdId: Encryption.encrypt(id),
      },
    });

    return {
      store: data.getStoreByID,
      error: null,
    };
  } catch (err) {
    throw new Error(err as string);
  }
}

const dropDown: DropDown[] = [
  {
    name: "homePage",
    href: "/",
  },
];

export default async function Page({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const { store } = await getData(params.id);
  return <StorePage store={store as storeData} dropDown={dropDown} />;
}
