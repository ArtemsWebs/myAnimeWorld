import { Elysia, t } from 'elysia';
import { editAnimeByIdDomain, getAnime, getAnimes } from '../domain';
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
  )
  .patch(
    '/anime/edit/:animeId',
    async ({ params: { animeId }, body }) => {
      return await editAnimeByIdDomain(animeId, body);
    },
    {
      params: t.Object({
        animeId: t.Numeric(),
      }),
      body: 'anime.model.edit',
      response: 'anime.model',
    },
  );
