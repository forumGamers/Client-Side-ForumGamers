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
  query GetUserData($accessToken: String!) {
    getUserData(access_token: $accessToken) {
      Followings {
        StoreId
      }
      Store {
        background
        description
        id
        image
        name
      }
      TopUps {
        amount
        status
      }
      balance
      email
      exp
      fullName
      id
      imageUrl
      isVerified
      phoneNumber
      point
      role
      username
    }
  }
`;
