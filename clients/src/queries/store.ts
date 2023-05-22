import { gql } from "@apollo/client";

export const GETUSERSTORE = gql`
  query GetUserStore {
    getUserStore {
      background
      description
      exp
      image
      name
      status_id
      Items {
        active
        description
        discount
        image
        name
        price
        slug
        sold
        status
        stock
        ID
      }
      active
      ID
      StoreStatus {
        ID
        name
      }
      avg_rating
      rating_count
    }
  }
`;
