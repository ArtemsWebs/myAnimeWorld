import { Elysia, t } from 'elysia';
import {
  createUser,
  getAllDomainUsers,
  getDomainUser,
  updateUser,
} from '../domain';
import { UserModelDTO } from '../model/user.model';

export const userRouters = new Elysia({ prefix: '/user' })
  .use(UserModelDTO)
  .get(
    '/me',
    async ({ query, set }) => {
      const domainUser = await getDomainUser(query.email);
      return domainUser;
    },
    { query: t.Object({ email: t.String() }) },
  )
  .get('/allUsers', async () => {
    return await getAllDomainUsers();
  })
  .post(
    '/createUser',
    async ({ body }) => {
      console.log(body);
      return await createUser(body);
    },
    {
      body: 'user.model',
    },
  )
  .put(
    '/updateUser/:userId',
    async ({ params: { userId }, body }) => {
      return await updateUser(userId, body);
    },
    {
      params: t.Object({ userId: t.String() }),
      body: 'user.model',
    },
  )
  .delete('/deleteUser/:userId', async ({ params: { userId } }) => {}, {
    params: t.Object({ userId: t.String() }),
  });
