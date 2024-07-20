import { NextApiRequest } from 'next';
import { hash } from 'bcrypt';
import prismadb from '@/../lib/prismaDb';

export const dynamic = 'force-dynamic';

export async function POST(req: NextApiRequest, res: Response) {
  if (req.method !== 'POST') {
    return new Response('Error: 405', { status: 405 });
  }
  //@ts-expect-error странные дело но req.body не пашет https://stackoverflow.com/questions/76369742/nextjs13-api-request-body-is-null-in-api-handler
  const body = await req.json();

  if (!body) throw new Error('Юзер не передан');
  try {
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
      include: {
        roles: true,
      },
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        roles: { connect: [{ id: 1 }] },
      },
    });

    return Response.json(user);
  } catch (error) {
    console.log(error);
    return new Response('Error: 400', {
      status: 400,
      statusText: 'Непредвиденная ошибка',
    });
  }
}
