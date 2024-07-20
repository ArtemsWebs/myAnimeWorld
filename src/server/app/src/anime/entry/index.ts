import { Elysia, t } from 'elysia';
import { getAnime } from '../domain';
import { ServerError } from '../../../lib/serverError';

export const animeRouters = new Elysia()
  .error({
    ServerError,
  })
  .onError(({ code, error, set }) => {
    if (code === 'ServerError') {
      set.status = 404;
      return {
        name: code,
        httpCode: error.httpCode,
        description: error.message,
      };
    }
  })
  .get(
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
