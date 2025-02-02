import { Elysia, t } from 'elysia';

export const LicensorModelBaseGet = t.Object({
  id: t.Number(),
  malId: t.Number(),
  type: t.String(),
  name: t.String(),
  url: t.String(),
});

export const LicensorModelDTO = new Elysia().model({
  'licensor.all.response': t.Array(LicensorModelBaseGet),
});
