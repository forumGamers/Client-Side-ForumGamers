import { gql } from "@apollo/client";

export const userTypeDefs = gql`
  type message {
    message: String!
  }

  type access_token {
    access_token: String!
  }

  type following {
    id: ID
    UserId: Int
    StoreId: Int
    createdAt: String
    updatedAt: String
  }

  type topUp {
    id: ID
    amount: Int
    UserId: Int
    status: String
    createdAt: String
    updatedAt: String
  }

  type store {
    id: ID
    name: String
    image: String
    background: String
    description: String
  }

  type game {
    id: String
    name: String
    type: String
    image: String
    description: String
  }

  type achievement {
    id: ID
    name: String
    image: String
    Game: game
  }

  type user {
    id: ID
    fullName: String
    username: String
    email: String
    isVerified: Boolean
    balance: Int
    imageUrl: String
    phoneNumber: String
    StoreId: Int
    role: String
    point: Int
    exp: Int
    createdAt: String
    updatedAt: String
    Followings: [following]
    TopUps: [topUp]
    Store: store
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
    getUserData(access_token: String!): user
    getUserAchievement(access_token: String!, gameId: String!): [achievement]
  }

  type Mutation {
    register(register: registerInput!): message!
    login(login: loginInput!): access_token!
    verifyUser(token: tokenVerification!): message
  }
`;
