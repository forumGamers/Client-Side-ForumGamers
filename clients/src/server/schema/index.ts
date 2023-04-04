import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "./typedefs/user";
import { userResolver } from "./resolver/user";

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs],
  resolvers: [userResolver],
});
