import { type NextRequest, NextResponse } from 'next/server';
import { responseErrorHandler } from '@/app/lib/utils/ResponseErrorHandler';

export async function GET(req: NextRequest, res: Response) {
  if (req.method !== 'GET') throw new Error('Handler не найден');

  const searchParams = req.nextUrl.searchParams;
  const animeId = searchParams.get('animeId');
  if (!animeId) return;
  try {
    const currentAnime = await fetch(
      `${process.env.BACKEND_BASE_URL}/anime/${animeId}`,
    )
      .then((response) => response.json())
      .catch((er) => er);

    if ('httpCode' in currentAnime) {
      responseErrorHandler(currentAnime);
    }

    const currentAnimeVideo = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/videos`,
    ).then((response) => response.json());

    if ('httpCode' in currentAnimeVideo) {
      responseErrorHandler(currentAnimeVideo);
    }

    return Response.json({
      currentAnime: currentAnime,
      currentVideos: currentAnimeVideo.data,
    });
  } catch (e) {
    debugger;
    console.log(e);
  }
}
