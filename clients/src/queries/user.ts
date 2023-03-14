import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($register: InputRegister) {
    register(register: $register) {
      message
    }
  }
`;
