import { gql } from "@apollo/client";

export const GETUSERACHIEVEMENT = gql`
  query GetUserAchievement {
    getUserAchievement {
      Game {
        description
        id
        image
        name
        type
      }
      id
      image
      name
    }
  }
`;

export const GETGAMELIST = gql`
  query Query {
    getGameList {
      description
      id
      image
      name
      type
    }
  }
`;
