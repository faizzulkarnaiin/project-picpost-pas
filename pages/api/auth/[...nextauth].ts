import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials: any, req) {
        return {
          ...credentials,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      try {
        if (trigger === "update") {
          return { ...token, ...session.user };
        }

        return {
          ...token,
          ...user,
          ...account,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async session({ session, user, token }) {
      console.log(token.role);
      console.log(token);
      try {
        session.user.id = Number(token.id);
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
        session.user.isBanned = token.isBanned;

        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
