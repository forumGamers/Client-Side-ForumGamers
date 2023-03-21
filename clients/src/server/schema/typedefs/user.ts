import { gql } from "@apollo/client";

export const userTypeDefs = gql`
  type message {
    message: String!
  }

  type access_token {
    access_token: String!
    username: String!
    email: String!
    imageUrl: String!
  }

  input registerInput {
    fullName: String!
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
  }

  input tokenVerification {
    token: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    register(register: registerInput!): message!
    login(login: loginInput!): access_token!
    verifyUser(token: tokenVerification!): message
  }
`;
