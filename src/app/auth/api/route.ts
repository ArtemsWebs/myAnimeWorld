import { NextApiRequest, NextApiResponse } from 'next';
import { compare, hash } from 'bcrypt';
import prismadb from '@/../lib/prismaDb';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const dynamic = 'force-dynamic';

export async function POST(req: NextApiRequest, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  //@ts-expect-error странные дело но req.body не пашет https://stackoverflow.com/questions/76369742/nextjs13-api-request-body-is-null-in-api-handler
  const body = await req.json();

  if (!body) throw new Error('Юзер не передан');
  try {
    console.log(body);
    const { email, name, password } = body;
    const existingUser = await prismadb.user.findUnique({
      where: { email: email },
    });
    if (existingUser)
      return new Response('Такой пользователь уже существует', {
        status: 410,
      });

    const hashedPassword = await hash(password, 12);
    const user = await prismadb.user.create({
      data: { email, name, hashedPassword, image: '' },
    });

    return Response.json(user);
  } catch (error) {
    console.log(error);
    return Response.status(400);
  }
}
