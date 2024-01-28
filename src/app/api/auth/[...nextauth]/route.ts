import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prismadb from '@/../lib/prismaDb';
import { compare } from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismaDb from '@/../lib/prismaDb';
import { ShikimoriProvider } from '@/app/api/Providers/ShikimoriProvider';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Укажите логин и пароль');

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword)
          throw new Error('Email не обнаружен');

        const isCorrectPassword = await compare(
          credentials.password,
          user?.hashedPassword,
        );
        if (!isCorrectPassword) throw new Error('Некоректный пароль');

        return user;
      },
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    ShikimoriProvider({
      clientId: process.env.SHIKIMORI_ID || '',
      clientSecret: process.env.SHIKIMORI_SECRET || '',
    }),
  ],
  pages: { signIn: '/auth' },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismaDb),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_SECRET,
  jwt: {
    secret: process.env.NEXT_JWT_SECRET,
  },
};

const handler = NextAuth({ ...nextAuthOptions });

export { handler as GET, handler as POST };
