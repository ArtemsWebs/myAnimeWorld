import { Elysia, t } from 'elysia';

import { LicensorModelDTO } from '@/server/src/licensor/model/licensor.model';
import { getDomainAllLicensor } from '@/server/src/licensor/domain';

export const licensorRouters = new Elysia({ prefix: '/licensor' })
  .use(LicensorModelDTO)
  .get(
    '/all',
    async () => {
      return await getDomainAllLicensor();
    },
    {
      response: 'licensor.all.response',
    },
  );
