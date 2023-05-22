export type UserPayload = {
  access_token: string;
  username: string;
  email: string;
  isVerified: boolean;
  StoreId: number | null;
};

export type followings = {
  StoreId: number;
};

export type store = {
  background: string;
  description: string;
  id: number;
  image: string;
  name: string;
};

export type topUp = {
  amount: number;
  status: string;
};

export type UserData = {
  id: number;
  username: string;
  role: string;
  point: number;
  isVerified: boolean;
  imageUrl?: string;
  backgroundImage?: string;
  fullName: string;
  exp: number;
  email: string;
  balance: number;
  TopUps?: topUp[];
  Store?: store;
  Followings?: followings[];
};
