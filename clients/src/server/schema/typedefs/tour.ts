import { gql } from "@apollo/client";

export const tourTypeDefs = gql`
  type game {
    id: String
    name: String
    type: String
    image: String
    description: String
  }

  type achievement {
    id: ID
    name: String
    image: String
    Game: game
  }

  type Query {
    getUserAchievement(access_token: String!): [achievement]
  }
`;
