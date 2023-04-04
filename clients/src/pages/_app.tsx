import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}
