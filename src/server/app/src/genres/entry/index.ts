import { Elysia, t } from 'elysia';
import { genresAutocomplete, genresForAnime } from '../domain';

export const genresRouters = new Elysia()
  .get('/anime/genres/autocomplete', async () => {
    return genresAutocomplete();
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
