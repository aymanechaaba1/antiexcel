import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/prisma/prismaClient';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id = user.id;
        token.access_token = account?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id;
      if (token.access_token) session.access_token = token.access_token;

      return session;
    },
  },
} satisfies NextAuthOptions;
