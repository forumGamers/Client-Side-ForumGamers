import { userProfile } from "./user";

export interface timeLine {
  isclick: boolean;
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
  User: userProfile;
}

export interface reply {
  _id: string;
  CreatedAt: string;
  UpdatedAt: string;
  text: string;
  commentId: string;
  userId: number;
  User: userProfile;
}

export interface comment {
  _id: string;
  CreatedAt: string;
  UpdatedAt: string;
  text: string;
  postId: string;
  userId: number;
  Reply: reply[];
  User: userProfile;
}

export interface CommentSection {
  text: string;
  Reply: ReplySection[];
  _id: string;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  User: userProfile;
}

export interface ReplySection {
  text: string;
  _id: string;
  User: userProfile;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}
