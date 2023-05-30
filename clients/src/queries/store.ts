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
      followers
      CreatedAt
    }
  }
`;

export const GETSTOREBYID = gql`
  query GetStoreByID($getStoreByIdId: String!) {
    getStoreByID(id: $getStoreByIdId) {
      CreatedAt
      ID
      Items {
        ID
        active
        description
        discount
        image
        name
        price
        sold
        slug
        status
        stock
      }
      StoreStatus {
        ID
        name
      }
      active
      avg_rating
      background
      description
      exp
      followers
      image
      name
      rating_count
      status_id
    }
  }
`;

export const GETALLSTOREID = gql`
  query GetAllStoreId {
    getAllStoreId {
      ID
    }
  }
`;

export const GETALLSLUGBYSTOREID = gql`
  query GetAllSlugByStoreId($getAllSlugByStoreIdId: String!) {
    getAllSlugByStoreId(id: $getAllSlugByStoreIdId) {
      Slug
    }
  }
`;

export const GETALLSLUG = gql`
  query GetAllSlug {
    getAllSlug {
      ID
      Slug
    }
  }
`;

export const GETITEMBYSLUG = gql`
  query GetAllSlug($slug: String!) {
    getItemBySlug(slug: $slug) {
      ID
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
    }
  }
`;
