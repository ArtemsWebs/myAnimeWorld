import serverAuth from '@/../lib/serverAuth';

//@NOTE handler на получение текущего юзера из serverAuth
export async function GET(req: Request, res: Response) {
  if (req.method !== 'GET') throw new Error('Handler не найден');
  try {
    const { currentUser } = await serverAuth();

    return Response.json({ currentUser });
  } catch (e) {
    console.log(e);
  }
}
