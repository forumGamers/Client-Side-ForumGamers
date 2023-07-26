import { gql } from "@apollo/client";

export const GETTIMELINE = gql`
  query Query {
    getTimeLine {
      CountComment
      CountLike
      CountShare
      CreatedAt
      Media {
        id
        type
        url
      }
      UpdatedAt
      User {
        UUID
        id
        imageUrl
        username
      }
      _id
      allowComment
      isLiked
      isShared
      privacy
      tags
      text
      userId
    }
  }
`;

export const LIKEAPOST = gql`
  mutation Mutation($likeAPostId: String!) {
    likeAPost(id: $likeAPostId) {
      message
    }
  }
`;

export const UNLIKEAPOST = gql`
  mutation Mutation($unLikeAPostId: String!) {
    unLikeAPost(id: $unLikeAPostId) {
      message
    }
  }
`;
