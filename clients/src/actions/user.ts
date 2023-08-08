"use server";

import { LOGIN } from "@/queries/user";
import { Mutate } from ".";

type result = {
  success: boolean;
  data?: any;
  message?: string;
};

export const loginHandler = async ({
  email,
  password,
  access_token,
}: {
  email: string;
  password: string;
  access_token: string;
}): Promise<result> =>
  new Promise(async (resolve) => {
    const { data, errors } = await Mutate({
      mutation: LOGIN,
      variables: {
        login: {
          email,
          password,
        },
      },
      context: {
        headers: {
          access_token,
        },
      },
    });

    if (!data && errors?.length)
      resolve({
        success: false,
        message: errors[0].message,
      });

    resolve({ success: true, data });
  });
