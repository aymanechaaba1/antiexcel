import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/prisma/prismaClient';
import { Resend } from 'resend';
import WelcomeEmail from '@/components/emails/WelcomeEmail';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
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
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.id = user.id;
        token.access_token = account?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.

      if (token.id) session.user.id = token.id;
      if (token.access_token) session.access_token = token.access_token;

      return session;
    },
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      console.log(isNewUser);
      if (isNewUser) {
        // send welcome email
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // custom email
          to: `aymanechaaba1@gmail.com`, // to new user
          subject: `${user.name}, Welcome to AntiExcel!`,
          react: WelcomeEmail({ user }) as React.ReactElement,
        });
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
} satisfies NextAuthOptions;
