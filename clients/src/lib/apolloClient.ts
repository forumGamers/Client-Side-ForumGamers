import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { createContext } from "react";
const uri = process.env.PORT || `localhost:5000`;

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export const ApolloClientContext = createContext(client);
