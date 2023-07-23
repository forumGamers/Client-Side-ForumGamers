import { gql } from "@apollo/client";

export const GETTIMELINE = gql`
  query Query {
    getTimeLine {
      CountComment
      CountLike
      CountShare
      CreatedAt
      UpdatedAt
      User {
        UUID
        id
        imageUrl
        username
      }
      _id
      allowComment
      Media {
        id
        type
        url
      }
      text
      userId
    }
  }
`;
