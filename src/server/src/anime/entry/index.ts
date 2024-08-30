import { Elysia, t } from 'elysia';
import { getAnime, getAnimes } from '../domain';
import {
  AnimeModelDTO,
  AnimeModelResponse,
} from '@/server/src/anime/model/anime.model';

export const animeRouters = new Elysia({ prefix: '/animes' })
  .use(AnimeModelDTO)
  .get(
    '/allAnimes',
    async ({ query: { offset, limit } }) => {
      const animes = await getAnimes(offset, limit);
      return animes as AnimeModelResponse[];
    },
    {
      query: t.Object({
        offset: t.Numeric(),
        limit: t.Numeric(),
      }),
      response: 'animeAll.model.response',
    },
  )
  .get(
    '/anime/:animeId',
    async ({ params: { animeId } }) => {
      return (await getAnime(animeId)) as AnimeModelResponse;
    },
    {
      params: t.Object({
        animeId: t.Numeric(),
      }),
      response: 'anime.model',
    },
  );
