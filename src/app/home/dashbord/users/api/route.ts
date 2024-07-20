import { NextApiRequest } from 'next';
import { hash } from 'bcrypt';
import prismadb from '@/../lib/prismaDb';
import { responseErrorHandler } from '@/app/lib/utils/ResponseErrorHandler';

export const dynamic = 'force-dynamic';

export async function GET(req: NextApiRequest, res: Response) {
  const currentAnime = await fetch(
    `${process.env.BACKEND_BASE_URL}/user/allUsers`,
  )
    .then((response) => response.json())
    .catch((er) => er);

  if ('httpCode' in currentAnime) {
    responseErrorHandler(currentAnime);
  }
}
