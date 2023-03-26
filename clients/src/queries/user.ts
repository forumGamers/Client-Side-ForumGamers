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
  query Query($accessToken: String!) {
    getUserData(access_token: $accessToken) {
      email
      fullName
      point
      balance
      exp
      username
      Followings {
        StoreId
      }
      id
      imageUrl
      isVerified
      phoneNumber
      role
      StoreId
    }
  }
`;
