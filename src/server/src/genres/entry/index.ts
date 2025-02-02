import { Elysia, t } from 'elysia';
import { genresAll, genresAutocomplete, genresForAnime } from '../domain';

export const genresRouters = new Elysia()
  .get('/anime/genres/autocomplete', async () => {
    return genresAutocomplete();
  })
  .get('/anime/genres/all', async () => {
    return genresAll();
  })
  .get(
    '/anime/genres/:animeId',
    async ({ params: { animeId } }) => {
      return genresForAnime(animeId);
    },
    {
      params: t.Object({
        animeId: t.Numeric(),
      }),
    },
  );
