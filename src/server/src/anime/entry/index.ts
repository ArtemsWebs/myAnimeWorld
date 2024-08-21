import { Elysia, t } from 'elysia';
import { getAnime, getAnimes } from '../domain';
import { AnimeModelDTO } from '@/server/src/anime/model/anime.model';

export const animeRouters = new Elysia({ prefix: '/animes' })
  .use(AnimeModelDTO)
  .get(
    '/allAnimes',
    async ({ params: { offset, limit } }) => {
      return await getAnimes(offset, limit);
    },
    {
      params: t.Object({
        offset: t.Numeric(),
        limit: t.Numeric(),
      }),
      response: 'animeAll.model.response',
    },
  )
  .get(
    '/anime/:animeId',
    async ({ params: { animeId } }) => {
      return await getAnime(animeId);
    },
    {
      params: t.Object({
        animeId: t.Numeric(),
      }),
      response: 'anime.model',
    },
  );
