import {
  registerInput,
  loginInput,
  tokenVerification,
} from "@/server/interfaces/user";
import errorHandling from "@/server/middlewares/errorHandler";
import axios from "axios";
import { userUrl, eventUrl } from "@/server/constants";
import { signIn } from "next-auth/react";

export const userResolver = {
  Query: {
    getUserData: async (_: never, args: string) => {
      try {
        const { data, status } = await axios({
          method: "GET",
          url: `${userUrl}/users/myData`,
          headers: {
            Origin: process.env.ORIGIN,
            access_token: args,
          },
        });
        console.log(data);

        if (status !== 200) throw { message: data.message };

        return data;
      } catch (err) {
        errorHandling(err);
      }
    },
  },

  Mutation: {
    register: async (_: never, args: { register: registerInput }) => {
      try {
        const { register } = args;

        const { data: userResponse, status } = await axios({
          method: "POST",
          url: `${userUrl}/auth/register`,
          data: register,
          headers: {
            Origin: process.env.ORIGIN,
          },
        });

        if (status !== 201) throw { message: userResponse?.message };

        await axios({
          method: "POST",
          url: `${eventUrl}/user/register/${userResponse.id}`,
          data: {
            userName: userResponse.username,
            isVerified: userResponse.isVerified,
            email: userResponse.email,
          },
          headers: {
            Origin: process.env.ORIGIN,
          },
        });

        return { message: "success" };
      } catch (err) {
        errorHandling(err);
      }
    },
    login: async (_: never, args: { login: loginInput }) => {
      try {
        const { login } = args;

        const { data, status } = await axios({
          method: "POST",
          url: `${userUrl}/auth/login`,
          data: login,
          headers: {
            Origin: process.env.ORIGIN,
          },
        });

        if (status !== 200) throw { message: data?.message };

        const { access_token, email, username, imageUrl } = data;

        return {
          access_token,
          email,
          username,
          imageUrl,
        };
      } catch (err) {
        errorHandling(err);
      }
    },
    verifyUser: async (_: never, args: { token: tokenVerification }) => {
      try {
        const { token } = args;

        const { data, status } = await axios({
          method: "PATCH",
          url: `${userUrl}/users/verify?token=${token.token}`,
          headers: {
            Origin: process.env.ORIGIN,
          },
        });

        if (status !== 201) throw { message: data.message };

        return {
          message: data.message,
        };
      } catch (err) {
        errorHandling(err);
      }
    },
  },
};
