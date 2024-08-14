import prismaDb from '../../../../../lib/prismaDb';
import { AnimeT } from './types';

export const getAnimeById = async (animeId: number) => {
  const anime = await prismaDb.animes.findUnique({
    include: {
      genres: true,
      studios: true,
      licensors: true,
      producers: true,
    },
    where: { id: animeId },
  });
  return anime;
};

export const createNewAnime = async (animeData: AnimeT) => {
  const newAnime = await prismaDb.animes.create({
    include: {
      genres: true,
      studios: true,
      licensors: true,
      producers: true,
    },
    data: {
      id: animeData.mal_id,
      malId: animeData.mal_id,
      url: animeData.url,
      title: animeData.title,
      titleEnglish: animeData.title_english,
      titleJapanese: animeData.title_japanese,
      episodes: animeData.episodes,
      status: animeData.status,
      source: animeData.source,
      trailer: animeData.trailer,
      airing: animeData.airing,
      type: animeData.type,
      duration: animeData.duration,
      score: animeData.score,
      scoredBy: animeData.scored_by,
      rank: animeData.rank,
      rating: animeData.rating,
      season: animeData.season,
      popularity: animeData.popularity,
      images: animeData.images,
      members: animeData.members,
      favorites: animeData.favorites,
      background: animeData.background,
      producers: {
        connectOrCreate: [
          ...animeData.producers.map((studio) => ({
            where: { id: studio.mal_id },
            create: {
              id: studio.mal_id,
              malId: studio.mal_id,
              url: studio.url,
              type: studio.type,
              name: studio.name,
            },
          })),
        ],
      },
      licensors: {
        connectOrCreate: [
          ...animeData.licensors.map((studio) => ({
            where: { id: studio.mal_id },
            create: {
              id: studio.mal_id,
              malId: studio.mal_id,
              url: studio.url,
              type: studio.type,
              name: studio.name,
            },
          })),
        ],
      },
      studios: {
        connectOrCreate: [
          ...animeData.studios.map((studio) => ({
            where: { id: studio.mal_id },
            create: {
              id: studio.mal_id,
              malId: studio.mal_id,
              url: studio.url,
              type: studio.type,
              name: studio.name,
            },
          })),
        ],
      },
      genres: {
        connectOrCreate: [
          ...animeData.genres.map((genres) => ({
            where: { id: genres.mal_id },
            create: {
              id: genres.mal_id,
              malId: genres.mal_id,
              url: genres.url,
              type: genres.type,
              name: genres.name,
            },
          })),
        ],
      },
    },
  });
  return newAnime;
};
