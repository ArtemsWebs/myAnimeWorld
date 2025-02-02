import { Elysia, t } from 'elysia';

const StudioModelBaseGet = t.Object({
  id: t.Number(),
  malId: t.Number(),
  type: t.String(),
  name: t.String(),
  url: t.String(),
});

export const StudioModelDTO = new Elysia().model({
  'studio.all.response': t.Array(StudioModelBaseGet),
});
