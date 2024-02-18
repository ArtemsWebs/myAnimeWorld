import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
  if (req.method !== 'GET') throw new Error('Handler не найден');

  const searchParams = req.nextUrl.searchParams;
  const animeId = searchParams.get('animeId');
  if (!animeId) return;
  try {
    const currentAnime = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/full`,
    ).then((response) => response.json());

    const currentAnimeVideo = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/videos`,
    ).then((response) => response.json());

    return Response.json({
      currentAnime: currentAnime.data,
      currentVideos: currentAnimeVideo.data,
    });
  } catch (e) {
    debugger;
    console.log(e);
  }
}
