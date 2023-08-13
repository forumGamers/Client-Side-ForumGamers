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
  query GetUserData {
    getUserData {
      Followings {
        StoreId
      }
      Store {
        background
        description
        ID
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
      backgroundImage
    }
  }
`;

export const USERRESETPASSWORD = gql`
  mutation Mutation($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`;

export const USERCHANGEFORGETPASS = gql`
  mutation Mutation($payload: forgetPass!) {
    changeForgetPassword(payload: $payload) {
      message
    }
  }
`;

export const GOOGLELOGIN = gql`
  mutation GoogleLogin {
    googleLogin {
      access_token
    }
  }
`;

export const FOLLOWAUSER = gql`
  mutation Mutation($followAUserId: String!) {
    followAUser(id: $followAUserId) {
      message
    }
  }
`;

export const UNFOLLOWAUSER = gql`
  mutation Mutation($unFollowAUserId: String!) {
    unFollowAUser(id: $unFollowAUserId) {
      message
    }
  }
`;
