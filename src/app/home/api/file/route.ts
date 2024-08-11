import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, res: Response) {
  const cookiesStore = cookies();
  if (req.method !== 'GET') {
    return new Response('Error: 405', { status: 405 });
  }
  const searchParams = req.nextUrl.searchParams;
  const fileName = searchParams.get('fileName');

  const downloadFile = await fetch(
    `${process.env.BACKEND_BASE_URL}/minio/uploadImageFile/${fileName}`,
  ).then((res) => res);

  return new Response(downloadFile.body, {
    headers: { 'content-type': 'image/png' },
  });
}
