"use server";

import { FOLLOWAUSER, LOGIN, UNFOLLOWAUSER } from "@/queries/user";
import { Mutate } from ".";
import { checkServerSession } from "@/helper/global";

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

export const followUser = async (id: string): Promise<result> =>
  new Promise(async (resolve) => {
    let access_token: string | null = null;
    let user: any = null;
    await checkServerSession((session) => {
      access_token = session?.user?.access_token as string;
      user = session?.user;
    });
    const { data, errors } = await Mutate<{ message: string }>({
      mutation: FOLLOWAUSER,
      context: {
        headers: {
          access_token,
        },
      },
      variables: {
        followAUserId: id,
      },
    });

    if (!data && errors?.length)
      resolve({
        success: false,
        message: errors[0].message,
      });

    resolve({ success: true, data });
  });

export const unFollowUser = async (id: string): Promise<result> =>
  new Promise(async (resolve) => {
    let access_token: string | null = null;
    let user: any = null;
    await checkServerSession((session) => {
      access_token = session?.user?.access_token as string;
      user = session?.user;
    });
    const { data, errors } = await Mutate<{ message: string }>({
      mutation: UNFOLLOWAUSER,
      context: {
        headers: {
          access_token,
        },
      },
      variables: {
        unFollowAUserId: id,
      },
    });

    if (!data && errors?.length)
      resolve({
        success: false,
        message: errors[0].message,
      });

    resolve({ success: true, data });
  });
