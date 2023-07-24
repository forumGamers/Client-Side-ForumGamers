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
  isLiked: boolean;
  isShared: boolean;
  tags: string[];
  privacy: string;
  User: {
    UUID: string;
    id: number;
    imageUrl: string;
    username: string;
  };
}
