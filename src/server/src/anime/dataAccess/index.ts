import prismaDb from '../../../../../lib/prismaDb';
import { AnimeT } from './types';

export const getAnimesDB = async (offset: number, limit: number) => {
  const animes = await prismaDb.animes.findMany({
    take: limit,
    skip: limit * offset - limit,
    orderBy: {
      airing: 'asc',
    },
  });
  return animes;
};

export const createAnimes = async (animesData: AnimeT[]) => {
  const allAnimes = animesData.map(async (animeData) => {
    return await createNewAnime(animeData);
  });
  return allAnimes;
};

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
  const newAnime = await prismaDb.animes.upsert({
    include: {
      genres: true,
      studios: true,
      licensors: true,
      producers: true,
    },
    where: {
      id: animeData.mal_id,
    },
    update: {
      url: animeData.url,
      title: animeData.title ?? '',
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
        connectOrCreate: animeData.producers
          ? animeData.producers?.map((studio) => ({
              where: { id: studio.mal_id },
              create: {
                id: studio.mal_id,
                malId: studio.mal_id,
                url: studio.url,
                type: studio.type,
                name: studio.name,
              },
            }))
          : [],
      },
      licensors: {
        connectOrCreate: animeData.licensors
          ? animeData.licensors?.map((studio) => ({
              where: { id: studio.mal_id },
              create: {
                id: studio.mal_id,
                malId: studio.mal_id,
                url: studio.url,
                type: studio.type,
                name: studio.name,
              },
            }))
          : [],
      },
      studios: {
        connectOrCreate: animeData.studios
          ? animeData.studios?.map((studio) => ({
              where: { id: studio.mal_id },
              create: {
                id: studio.mal_id,
                malId: studio.mal_id,
                url: studio.url,
                type: studio.type,
                name: studio.name,
              },
            }))
          : [],
      },
      genres: {
        connectOrCreate: animeData.genres
          ? animeData.genres?.map((genres) => ({
              where: { id: genres.mal_id },
              create: {
                id: genres.mal_id,
                malId: genres.mal_id,
                url: genres.url,
                type: genres.type,
                name: genres.name,
              },
            }))
          : [],
      },
    },
    create: {
      id: animeData.mal_id,
      malId: animeData.mal_id,
      url: animeData.url,
      title: animeData.title ?? '',
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
        connectOrCreate: animeData.producers
          ? animeData.producers?.map((studio) => ({
              where: { id: studio.mal_id },
              create: {
                id: studio.mal_id,
                malId: studio.mal_id,
                url: studio.url,
                type: studio.type,
                name: studio.name,
              },
            }))
          : [],
      },
      licensors: {
        connectOrCreate: animeData.licensors
          ? animeData.licensors?.map((studio) => ({
              where: { id: studio.mal_id },
              create: {
                id: studio.mal_id,
                malId: studio.mal_id,
                url: studio.url,
                type: studio.type,
                name: studio.name,
              },
            }))
          : [],
      },
      studios: {
        connectOrCreate: animeData.studios
          ? animeData.studios?.map((studio) => ({
              where: { id: studio.mal_id },
              create: {
                id: studio.mal_id,
                malId: studio.mal_id,
                url: studio.url,
                type: studio.type,
                name: studio.name,
              },
            }))
          : [],
      },
      genres: {
        connectOrCreate: animeData.genres
          ? animeData.genres?.map((genres) => ({
              where: { id: genres.mal_id },
              create: {
                id: genres.mal_id,
                malId: genres.mal_id,
                url: genres.url,
                type: genres.type,
                name: genres.name,
              },
            }))
          : [],
      },
    },
  });
  return newAnime;
};
