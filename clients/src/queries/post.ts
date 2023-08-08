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

export const GETPOSTCOMMENT = gql`
  query Query($getPostCommentId: String!) {
    getPostComment(id: $getPostCommentId) {
      CreatedAt
      UpdatedAt
      User {
        UUID
        id
        imageUrl
        username
      }
      _id
      postId
      text
      userId
      Reply {
        CreatedAt
        UpdatedAt
        _id
        commentId
        text
        userId
      }
    }
  }
`;

export const COMMENTAPOST = gql`
  mutation Mutation($text: String!, $postId: String!) {
    commentAPost(text: $text, postId: $postId) {
      id
      message
    }
  }
`;

export const REPLYCOMMENT = gql`
  mutation Mutation($text: String!, $commentId: String!) {
    replyComment(text: $text, commentId: $commentId) {
      id
      message
    }
  }
`;
