"use client";

import { ApolloProvider } from "@apollo/client";
import { useApollo, initializeApollo } from "@/lib/apolloClient";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/material-tailwind";

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const client = useApollo(initializeApollo());
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
