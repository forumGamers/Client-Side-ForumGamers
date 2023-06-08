"use client";

import { StorePageQuery, storeData } from "@/interfaces/store";
import EmptyData from "../emptyData";
import StoreCard from "../card/cardStore";
import { useEffect, useState } from "react";
import FormModal from "../modal/formModal";
import { client } from "@/lib/apolloClient";
import { GETSTOREDATAFORSTOREPAGE } from "@/queries/store";
import Pagination from "../pagination";
import Loading from "../loading";

async function fetchData(
  query: StorePageQuery
): Promise<{ store: storeData[] }> {
  try {
    const { data } = await client.query<{ getAllStore: storeData[] }>({
      query: GETSTOREDATAFORSTOREPAGE,
      variables: {
        query,
      },
    });

    return { store: data.getAllStore as storeData[] };
  } catch (err) {
    return { store: [] };
  }
}

export default function StoreSection({
  stores,
}: {
  stores: storeData[];
}): JSX.Element {
  const [query, setQuery] = useState<StorePageQuery>({});
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<storeData[]>([]);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setQuery({
      ...query,
      [name]: value,
    });
  };

  useEffect(() => {
    setData(stores);
  }, []);

  const next = async (): Promise<void> => {
    setLoading(true);
    setQuery({
      ...query,
      page: String(parseInt(query.page as string) + 1),
    });

    const { store } = await fetchData(query);

    setData(store);
    setLoading(false);
  };

  const previous = async (): Promise<void> => {
    setLoading(true);
    setQuery({
      ...query,
      page: String(parseInt(query.page as string) - 1),
    });

    const { store } = await fetchData(query);

    setData(store);
    setLoading(false);
  };

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const { store } = await fetchData(query);

    setData(store);
    setLoading(false);
  };
  return (
    <>
      <FormModal open={modal} onSubmit={submit}>
        <>
          <input
            type="text"
            placeholder="name"
            className="input w-full max-w-xs"
            value={query.name}
            onChange={onChangeHandler}
          />
        </>
      </FormModal>
      <button onClick={() => setModal(modal ? false : true)}>Filter</button>
      {loading ? (
        <Loading />
      ) : (
        <main>
          {data.length ? (
            data.map((el: storeData) => <StoreCard store={el} key={el.ID} />)
          ) : (
            <EmptyData message="Data not Found" />
          )}
        </main>
      )}
      <Pagination
        previous={previous}
        next={next}
        page={parseInt(query.page as string)}
      />
    </>
  );
}
