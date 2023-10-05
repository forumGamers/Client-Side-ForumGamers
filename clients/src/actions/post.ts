"use server";

import {
  COMMENTAPOST,
  GETPOSTBYID,
  LIKEAPOST,
  REPLYCOMMENT,
  UNLIKEAPOST,
} from "@/queries/post";
import { Mutate, Query } from ".";
import Encryption from "@/helper/encryption";
import { checkServerSession } from "@/helper/global";
import { timeLine } from "@/interfaces/post";

type result = {
  success: boolean;
  data?: any;
  message?: string;
  user?: any;
};

export const LikeAPost = async (id: string) =>
  new Promise(async (resolve, reject) => {
    let access_token: string | null = null;
    await checkServerSession((session) => {
      access_token = session?.user?.access_token as string;
    });
    const { data, errors } = await Mutate({
      mutation: LIKEAPOST,
      variables: {
        likeAPostId: Encryption.encrypt(id),
      },
      context: {
        headers: {
          access_token,
        },
      },
    });

    if (!data && errors?.length) {
      const message = errors[0].message as string;

      reject({ message });
    }

    resolve(data);
  });

export const UnLikeAPost = async (id: string) =>
  new Promise(async (resolve, reject) => {
    let access_token: string | null = null;
    await checkServerSession((session) => {
      access_token = session?.user?.access_token as string;
    });
    const { data, errors } = await Mutate({
      mutation: UNLIKEAPOST,
      context: {
        headers: {
          access_token,
        },
      },
      variables: {
        unLikeAPostId: Encryption.encrypt(id),
      },
    });

    if (!data && errors?.length) {
      const message = errors[0].message as string;

      reject({ message });
    }

    resolve(data);
  });

export const commentAPost = async ({
  text,
  postId,
}: {
  text: string;
  postId: string;
}): Promise<result> =>
  new Promise(async (resolve) => {
    let access_token: string | null = null;
    let user: any = null;
    await checkServerSession((session) => {
      access_token = session?.user?.access_token as string;
      user = session?.user;
    });

    const { data, errors } = await Mutate<{ id: string }>({
      mutation: COMMENTAPOST,
      context: {
        headers: {
          access_token,
        },
      },
      variables: {
        text: Encryption.encrypt(text),
        postId,
      },
    });

    if (!data && errors?.length) {
      const message = errors[0].message as string;

      resolve({ success: false, message });
    }

    resolve({ success: true, data, user });
  });

export const ReplyComment = async ({
  text,
  commentId,
}: {
  text: string;
  commentId: string;
}): Promise<result> =>
  new Promise(async (resolve) => {
    let access_token: string | null = null;
    let user: any = null;
    await checkServerSession((session) => {
      access_token = session?.user?.access_token as string;
      user = session?.user;
    });

    const { data, errors } = await Mutate<{ id: string }>({
      mutation: REPLYCOMMENT,
      context: {
        headers: {
          access_token,
        },
      },
      variables: {
        text: Encryption.encrypt(text),
        commentId,
      },
    });

    if (!data && errors?.length) {
      const message = errors[0].message as string;

      resolve({ success: false, message });
    }

    resolve({ success: true, data, user });
  });

export const GetAPost = async (id: string): Promise<result> =>
  new Promise(async (resolve) => {
    const { data, errors } = await Query<timeLine>({
      query: GETPOSTBYID,
      variables: {
        getPostByIdId: id,
      },
    });

    if (!data && errors?.length) {
      const message = errors[0].message as string;

      resolve({ success: false, message, data: [] });
    }

    resolve({ success: true, data });
  });
