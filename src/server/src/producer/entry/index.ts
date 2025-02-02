import { Elysia, t } from 'elysia';

import { ProducersModelDTO } from '@/server/src/producer/model/producer.model';
import { getDomainAllProducer } from '@/server/src/producer/domain';

export const producerRouters = new Elysia({ prefix: '/producer' })
  .use(ProducersModelDTO)
  .get(
    '/all',
    async () => {
      return await getDomainAllProducer();
    },
    {
      response: 'producer.all.response',
    },
  );
