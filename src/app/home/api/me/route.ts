import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, res: Response) {
  const cookiesStore = cookies();
  if (req.method !== 'GET') {
    return new Response('Error: 405', { status: 405 });
  }
  if (!req.nextUrl.searchParams) new Response('Error: 405', { status: 405 });
  const userInfo = await fetch(
    `${process.env.BACKEND_BASE_URL}/user/me/?${req.nextUrl.searchParams}`,
  ).then((res) => res.json());

  return Response.json({ userInfo: userInfo });
}
