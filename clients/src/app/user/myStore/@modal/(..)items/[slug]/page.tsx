import Modal from "@/components/modal";
import ItemPage from "@/components/views/item";
import Encryption from "@/helper/encryption";
import { item } from "@/interfaces/store";
import { client } from "@/lib/apolloClient";
import { GETITEMBYSLUG } from "@/queries/store";

async function getData(
  slug: string
): Promise<{ item: item | null; error: Error | null }> {
  try {
    const { data } = await client.query<{ getItemBySlug: item }>({
      query: GETITEMBYSLUG,
      variables: {
        slug: Encryption.encrypt(slug),
      },
    });
    return {
      item: data.getItemBySlug,
      error: null,
    };
  } catch (err) {
    throw new Error(err as string);
  }
}

export default async function ItemModal({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { item } = await getData(params.slug);
  return (
    <>
      <Modal>
        <ItemPage item={item as item} />
      </Modal>
    </>
  );
}
