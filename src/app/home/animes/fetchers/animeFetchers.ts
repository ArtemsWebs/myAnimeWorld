import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';
import { AnimeModelEditBody } from '@/server/src/anime/model/anime.model';

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
  return await fetcherClient.api.v1.animes.allAnimes.get({
    query: { offset, limit },
  });
};

export const getGenresForAnime = async (animeId: string) => {
  return await fetcherClient.api.v1.anime.genres({ animeId }).get();
};

export const getAllGenres = async () => {
  return await fetcherClient.api.v1.anime.genres.all.get();
};
export const getAllLicensors = async () => {
  return await fetcherClient.api.v1.licensor.all.get();
};

export const getAllProducers = async () => {
  return await fetcherClient.api.v1.producer.all.get();
};
export const getAllStudios = async () => {
  return await fetcherClient.api.v1.studio.all.get();
};
