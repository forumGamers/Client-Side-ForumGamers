import { GraphQLError } from "graphql";

export default function errorHandling(err: any) {
  const data = new GraphQLError(err?.response?.data?.message, {
    extensions: {
      code: err?.response?.status,
    },
  });
  throw new Error(data.message);
}
