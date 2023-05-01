import { gql } from "@apollo/client";

export const GETUSERACHIEVEMENT = gql`
  query GetUserAchievement($accessToken: String!) {
    getUserAchievement(access_token: $accessToken) {
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
