import { GETUSERDATA } from "@/queries/user";
import { client } from "@/lib/apolloClient";

export async function getStaticProps(context:any) {
  console.log(context)
  const { data } = await client.query({
    query: GETUSERDATA,
    variables: {
      access_token: 'aaaa',
    },
  });
  return {
    props: {
      data,
    },
  };
}

export default function UserProfile({ data }: any): JSX.Element {
  return <div>{data}</div>;
}
