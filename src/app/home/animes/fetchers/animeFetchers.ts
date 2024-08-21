import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';

export const getAnimeById = async (animeId: number | string) => {
  return await fetcherClient.api.v1.animes.anime({ animeId }).get();
};

export const getAnimes = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  return await fetcherClient.api.v1.animes.allAnimes.get();
};
