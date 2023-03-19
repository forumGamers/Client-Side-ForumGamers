import { gql } from "@apollo/client";

export const userTypeDefs = gql`
  type message {
    message: String!
  }

  input registerInput {
    fullName: String!
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    register(register: registerInput!): message!
  }
`;
