import { gql } from "@apollo/client";

export const GETTIMELINE = gql`
  query GetTimeLine {
  getTimeLine {
    CountComment
    CountLike
    CountShare
    CreatedAt
    UpdatedAt
    _id
    allowComment
    imageId
    imageUrl
    text
    userId
    User {
      UUID
      id
      imageUrl
      username
    }
  }
}
`;
