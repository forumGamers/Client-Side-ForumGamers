import { verifyToken } from "@/helper/jwt";
import { userUrl } from "@/server/constants";
import axios from "axios";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const { data, status } = await axios({
            method: "POST",
            url: `${userUrl}/auth/login`,
            data: {
              email: credentials?.email,
              password: credentials?.password,
            },
            headers: {
              Origin: process.env.ORIGIN,
            },
          });

          if (status !== 200) throw { message: data?.message };

          const payload = verifyToken(data?.access_token);

          const {
            id,
            email,
            username,
            fullName,
            isVerified,
            phoneNumber,
          } = payload;

          const user = {
            id,
            email,
            username,
            fullName,
            isVerified,
            phoneNumber,
          };

          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
