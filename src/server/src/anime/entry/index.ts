import { Elysia, t } from 'elysia';
import { getAnime } from '../domain';
import { ServerError } from '../../../lib/serverError';

export const animeRouters = new Elysia().get(
  '/anime/:animeId',
  async ({ params: { animeId } }) => {
    return await getAnime(animeId);
  },
  {
    params: t.Object({
      animeId: t.Numeric(),
    }),
  },
);
