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

export interface reply {
  _id: string;
  CreatedAt: string;
  UpdatedAt: string;
  text: string;
  commentId: string;
  userId: number;
}

export interface comment {
  _id: string;
  CreatedAt: string;
  UpdatedAt: string;
  text: string;
  postId: string;
  userId: number;
  Reply: reply[];
}
