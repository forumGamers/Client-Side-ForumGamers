import { DocumentNode } from "graphql";

export type BaseMutate = {
  mutation: DocumentNode;
  context?: any;
  variables?: any;
};

export type BaseQuery = {
  query: DocumentNode;
  context?: any;
  variables?: any;
};
