import { Elysia, t } from 'elysia';

import { StudioModelDTO } from '@/server/src/studio/model/studio.model';
import { getDomainAllStudio } from '@/server/src/studio/domain';

export const studioRouters = new Elysia({ prefix: '/studio' })
  .use(StudioModelDTO)
  .get(
    '/all',
    async () => {
      return await getDomainAllStudio();
    },
    {
      response: 'studio.all.response',
    },
  );
