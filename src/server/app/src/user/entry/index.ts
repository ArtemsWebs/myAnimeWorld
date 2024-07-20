import { Elysia, t } from 'elysia';
import { getAllDomainUsers, getDomainUser } from '../domain';

export const userRouters = new Elysia()
  .get(
    '/user/me',
    async ({ query, set }) => {
      const domainUser = await getDomainUser(query.email);
      return domainUser;
    },
    { query: t.Object({ email: t.String() }) },
  )
  .onRequest(({ set }) => {
    set.headers['Content-Type'] = 'application/json';
  })
  .get('/user/allUsers', async () => {
    return await getAllDomainUsers();
  });
