import {
  createAnimes,
  createNewAnime,
  editAnimeByIdDb,
  getAnimeById,
  getAnimesDB,
} from '../dataAccess';
import { AnimeT } from '../dataAccess/types';
import { ServerError } from '../../../lib/serverError';
import { AnimeModelEditBody } from '@/server/src/anime/model/anime.model';

export const getAnimes = async (offset: number, limit: number) => {
  const ourAnimes = await getAnimesDB(offset, limit);
  try {
    if (!ourAnimes || ourAnimes.length < offset * limit) {
      const foreignAnimes = await fetch(
        `https://api.jikan.moe/v4/anime?page=${offset}&limit=${limit}&status=airing&order_by=popularity`,
      ).then((response) => response.json());
      if ('error' in foreignAnimes || !foreignAnimes) {
        throw new ServerError(
          'DataNotFound',
          '404',
          'Данный ресурс не найден',
          true,
        );
      } else {
        const animesData = foreignAnimes.data as AnimeT[];
        const response = await createAnimes(animesData);
        if (response) {
          return response;
        } else {
          throw new ServerError(
            'DataNotFound',
            '404',
            'Данный ресурс не найден',
            true,
          );
        }
      }
    }
    return ourAnimes;
  } catch (err) {
    return err;
  }
};

export const getAnime = async (animeId: number) => {
  const ourAnime = await getAnimeById(animeId);

  try {
    if (!ourAnime) {
      const foreignAnime = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/full`,
      ).then((response) => response.json());

      if ('error' in foreignAnime || !foreignAnime) {
        throw new ServerError(
          'DataNotFound',
          '404',
          'Данный ресурс не найден',
          true,
        );
      } else {
        const animeData = foreignAnime.data as AnimeT;
        const response = await createNewAnime(animeData);
        if (response) {
          return response;
        } else {
          throw new ServerError(
            'DataNotFound',
            '404',
            'Данный ресурс не найден',
            true,
          );
        }
      }
    } else {
      return ourAnime;
    }
  } catch (e: any) {
    throw e;
  }
};

export const editAnimeByIdDomain = async (
  animeId: number,
  body: AnimeModelEditBody,
) => {
  return editAnimeByIdDb(animeId, body);
};
