import { customVerify, verifyToken, customToken } from "@/helper/jwt";
import NextAuth, { Session, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
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

          if (
            !id ||
            !email ||
            !username ||
            !fullName ||
            isVerified === null ||
            !phoneNumber
          )
            throw { message: "invalid token" };

          const user = {
            id,
            name: username,
            email,
            access_token: credentials?.access_token,
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
  jwt: {
    decode({ secret, token }) {
      return customVerify(token, secret) as JWT;
    },
    encode({ secret, token }) {
      return customToken(token as JWT, secret);
    },
  },
  callbacks: {
    session({
      session,
      user,
      token,
    }: {
      session: Session | any;
      user: any;
      token: TokenSet;
    }) {
      session.user.id = token.id;
      session.user.access_token = token.access_token;
      return session;
    },
    jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT | any;
      user?: any;
      account?: any;
      profile?: any;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.access_token = user?.access_token;
      }
      return token;
    },
  },
});
