import { NextApiRequest, NextApiResponse } from 'next';
import { responseErrorHandler } from '@/app/lib/utils/ResponseErrorHandler';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextApiRequest, res: Response) {
  const cookiesStore = cookies();
  const allUser = await fetch(`${process.env.BACKEND_BASE_URL}/user/allUsers`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch((er) => er);

  if ('httpCode' in allUser) {
    responseErrorHandler(allUser);
  }

  return NextResponse.json(allUser);
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const formData = await req.formData();
    const createdUser = await fetch(
      `${process.env.BACKEND_BASE_URL}/user/createUser`,
      {
        method: 'POST',
        body: formData,
      },
    );
    return NextResponse.json(createdUser);
  } catch (e) {
    return NextResponse.json(e);
  }
}
