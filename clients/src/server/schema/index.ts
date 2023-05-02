import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "./typedefs/user";
import { userResolver } from "./resolver/user";
import { tourTypeDefs } from "./typedefs/tour";
import { tourResolver } from "./resolver/tour";

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, tourTypeDefs],
  resolvers: [userResolver, tourResolver],
});
