export interface timeLine {
  CountComment: number;
  CountLike: number;
  CountShare: number;
  CreatedAt: string;
  UpdatedAt: string;
  _id: string;
  allowComment: boolean;
  Media: {
    id: string;
    type: string;
    url: string;
  };
  text: string;
  userId: number;
  User: {
    UUID: string;
    id: number;
    imageUrl: string;
    username: string;
  };
}

