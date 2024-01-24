import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prismadb from '@/../lib/prismaDb';
import { compare } from 'bcrypt';

const handler = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Укажите логин и пароль');

        console.log(credentials);

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword)
          throw new Error('Email не обнаружен');

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword,
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
  ],
  pages: { signIn: '/home/auth' },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_SECRET,
  jwt: {
    secret: process.env.NEXT_JWT_SECRET,
  },
});

export { handler as GET, handler as POST };
