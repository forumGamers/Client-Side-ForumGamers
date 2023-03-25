import { verifyToken } from "@/helper/jwt";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        access_token: {
          placeholder: "access_token",
          type: "access_token",
          label: "access_token",
        },
      },
      async authorize(credentials) {
        try {
          const payload = verifyToken(credentials?.access_token);

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
