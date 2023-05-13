import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { redis } from "@/lib/redis";

type Store = {
  name: string;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ store: Store }>> {
  const store: Store = { name: "a" };
  return {
    props: {
      store,
    },
  };
}

export default function MyStore(): JSX.Element {
  return <div></div>;
}
