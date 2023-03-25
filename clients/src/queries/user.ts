import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($register: registerInput!) {
    register(register: $register) {
      message
    }
  }
`;

export const LOGIN = gql`
  mutation Login($login: loginInput!) {
    login(login: $login) {
      access_token
    }
  }
`;

export const VERIFYUSER = gql`
  mutation VerifyUser($token: tokenVerification!) {
    verifyUser(token: $token) {
      message
    }
  }
`;

export const GETUSERDATA = gql`
  query Query {
    getUserData {
      id
      fullName
      exp
      email
      createdAt
      balance
      StoreId
      imageUrl
      isVerified
      phoneNumber
      point
      role
      updatedAt
      username
      Followings {
        StoreId
        UserId
      }
      TopUps {
        status
        amount
        createdAt
      }
    }
  }
`;
