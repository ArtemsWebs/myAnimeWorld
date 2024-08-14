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
    async ({ query }) => {
      const userInfo = await getDomainUser(query.email);
      return userInfo;
    },
    {
      query: t.Object({ email: t.String() }),
      response: 'user.me.response',
    },
  )
  .get(
    '/allUsers',
    async () => {
      const allUsers = await getAllDomainUsers();
      return allUsers;
    },
    {
      response: 'user.all.response',
    },
  )
  .post(
    '/createUser',
    async ({ body }) => {
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
