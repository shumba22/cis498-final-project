import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { USER_QUERIES, BUSINESS_QUERIES } from "./db/actions";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await USER_QUERIES.getByEmail(credentials.email);

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // on initial sign in, `user` is available
      if (user) {
        token.role = user.role;
        if (user.role === "BUSINESS") {
          // load business record for this user
          const biz = await BUSINESS_QUERIES.getById(user.id);
          token.businessName = biz?.name;
          token.businessId = biz?.id;
        }
      }
      // for all other calls, keep your existing logic
      if (token.sub) {
        const existing = await USER_QUERIES.getById(token.sub);
        if (existing) token.role = existing.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        // pass through businessName if present
        if (token.businessName) {
          session.user.businessName = token.businessName;
        }
        if (token.businessId) {
          session.user.businessId = token.businessId;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    error: "/auth/error",
  },
});
