import { registerInput } from "@/server/interfaces/user";
import errorHandling from "@/server/middlewares/errorHandler";
import axios from "axios";
import { userUrl, eventUrl } from "@/server/constants";

export const userResolver = {
  Query: {
    hello: () => "hello",
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

        if (status !== 201) throw { message: userResponse?.message, status };

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
        console.log(err);
        errorHandling(err);
      }
    },
  },
};
