import { gql } from "@apollo/client";

export const GETUSERACHIEVEMENT = gql`
  query GetUserAchievement {
    getUserAchievement {
      Game {
        description
        _id
        image
        name
        type
      }
      _id
      image
      name
    }
  }
`;

export const GETGAMELIST = gql`
  query Query {
    getGameList {
      description
      _id
      image
      name
      type
    }
  }
`;
