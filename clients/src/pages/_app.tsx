import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "daisyui/dist/full.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>Forum Gamers</title>
      </Head>
      <ApolloProvider client={client}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}
