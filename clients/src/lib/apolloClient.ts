import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { useMemo } from "react";
const uri = process.env.URL || "http://localhost:5000";
import { createUploadLink } from "apollo-upload-client";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  link: ApolloLink.from([createUploadLink({ uri })]),
});

function createIsoMorphLink() {
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
