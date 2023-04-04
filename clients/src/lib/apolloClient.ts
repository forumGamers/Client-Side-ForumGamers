import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { useMemo } from "react";
const uri = process.env.URL || "http://localhost:3000/api/graphql";
import { schema } from "@/server/schema";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

function createIsoMorphLink() {
  if (typeof window === "undefined") return new SchemaLink({ schema });

  return new HttpLink({
    uri,
    credentials: "same-origin",
  });
}

let apolloClient: any;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Set to true for SSR
    link: createIsoMorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const client = useMemo(() => initializeApollo(initialState), [initialState]);
  return client;
}
