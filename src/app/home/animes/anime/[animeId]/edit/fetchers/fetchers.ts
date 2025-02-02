import { AnimeModelEditBody } from '@/server/src/anime/model/anime.model';
import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';

export const updateAnime = async (
  animeId: number,
  body: AnimeModelEditBody,
) => {
  return await fetcherClient.api.v1.animes.anime.edit({ animeId }).patch(body);
};
