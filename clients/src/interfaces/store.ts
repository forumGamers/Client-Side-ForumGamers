export type store = {
  ID: number;
  name: string;
  image: string;
  background: string;
  description: string;
  status_id: number;
  exp: number;
  Active: boolean;
  Items: [item];
  avg_rating: number;
  rating_count: number;
  StoreStatus: StoreStatus;
  followers: number;
  CreatedAt: string;
};

export type item = {
  ID: number;
  name: string;
  image: string;
  status: string;
  slug: string;
  stock: number;
  price: number;
  description: string;
  discount: number;
  sold: number;
  active: Boolean;
};

export type StoreStatus = {
  id: number;
  name: string;
};
