import { tourUrl } from "@/server/constants";
import errorHandling from "@/server/middlewares/errorHandler";
import axios from "axios";

export const tourResolver = {
  Query: {
    getUserAchievement: async (_: never, args: { access_token: string }) => {
      try {
        const { access_token } = args;

        const { data: datas } = await axios({
          method: "GET",
          url: `${tourUrl}/user-achievement`,
          headers: {
            access_token,
            Origin: process.env.ORIGIN,
          },
        });

        const resp = datas.map((data: any) => {
          return {
            Game: {
              id: data?.game?._id,
              name: data?.game?.name,
              type: data?.game?.type,
              image: data?.game?.image,
              description: data?.game?.description,
            },
            name: data?.achievement?.name,
            image: data?.achievement?.image,
            id: data?.achievement?._id,
          };
        });

        return resp;
      } catch (err) {
        errorHandling(err);
      }
    },
  },
};
