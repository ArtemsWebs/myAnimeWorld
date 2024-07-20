import { createNewAnime, getAnimeById } from '../dataAccess';
import { AnimeT } from '../dataAccess/types';
import { ServerError } from '../../../lib/serverError';

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
