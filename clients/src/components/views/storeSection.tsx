"use client";

import { StorePageQuery, storeData } from "@/interfaces/store";
import EmptyData from "../emptyData";
import StoreCard from "../card/cardStore";
import { useEffect, useState } from "react";
import FormModal from "../modal/formModal";
import { GETSTOREDATAFORSTOREPAGE } from "@/queries/store";
import Pagination from "../pagination";
import Loading from "../loading1";
import { useLazyQuery } from "@apollo/client";

export default function StoreSection({
  stores,
}: {
  stores: storeData[];
}): JSX.Element {
  const [query, setQuery] = useState<StorePageQuery>({});
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<storeData[]>([]);
  const [execute, { loading, data: store }] = useLazyQuery<{
    getAllStore: storeData[];
  }>(GETSTOREDATAFORSTOREPAGE, {
    variables: {
      query,
    },
    onError() {
      setData([]);
    },
  });

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
    setQuery({
      ...query,
      page: String(parseInt(query.page as string) + 1),
    });

    await execute();

    setData(store?.getAllStore as storeData[]);
  };

  const previous = async (): Promise<void> => {
    setQuery({
      ...query,
      page: String(parseInt(query.page as string) - 1),
    });

    await execute();

    setData(store?.getAllStore as storeData[]);
  };

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    await execute();

    setData(store?.getAllStore as storeData[]);
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
