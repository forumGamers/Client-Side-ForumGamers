"use server";

import { LIKEAPOST, UNLIKEAPOST } from "@/queries/post";
import { Mutate } from ".";
import Encryption from "@/helper/encryption";
import { checkServerSession } from "@/helper/global";

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
