import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
