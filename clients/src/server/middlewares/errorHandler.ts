import { GraphQLError } from "graphql";

export default function errorHandling(err: any) {
  if (err.response)
    return new GraphQLError(err?.response?.data?.message, {
      extensions: {
        code: err?.response?.status,
      },
    });
  return err;
}
