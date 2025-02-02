import { Elysia, t } from 'elysia';

export const ProducerModelBaseGet = t.Object({
  id: t.Number(),
  malId: t.Number(),
  type: t.String(),
  name: t.String(),
  url: t.String(),
});

export const ProducersModelDTO = new Elysia().model({
  'producer.all.response': t.Array(ProducerModelBaseGet),
});
