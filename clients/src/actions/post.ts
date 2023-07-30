"use server";

import { LIKEAPOST, UNLIKEAPOST } from "@/queries/post";
import { Mutate } from ".";
import Encryption from "@/helper/encryption";
import { GraphQLError } from "graphql";

export const LikeAPost = async ({
  id,
  access_token,
}: {
  id: string;
  access_token: string;
}) => {
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

    throw {
      message,
    };
  }
};

export const UnLikeAPost = async ({
  id,
  access_token,
}: {
  id: string;
  access_token: string;
}) =>
  await Mutate({
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
