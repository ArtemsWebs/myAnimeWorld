import { Elysia, t } from 'elysia';
import {
  createUser,
  deleteUser,
  getAllDomainUsers,
  getDomainUser,
  updateUser,
} from '../domain';
import { UserModelDTO } from '../model/user.model';
import { ServerError } from '@/server/lib/serverError';

export const userRouters = new Elysia({ prefix: '/user' })
  .use(UserModelDTO)
  .get(
    '/me',
    async ({ query: { email } }) => {
      const userInfo = await getDomainUser(email);
      if (!userInfo) {
        throw new ServerError(
          'AuthorizationError',
          '422',
          'Пользователь не найден',
          true,
        );
      }
      return userInfo;
    },
    {
      query: t.Object({ email: t.String() }),
      response: 'user.me.response',
    },
  )
  .get(
    '/all',
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
    { body: 'user.model.body.create' },
  )
  .put(
    '/updateUser/:userId',
    async ({ params: { userId }, body }) => {
      return await updateUser(userId, body);
    },
    {
      params: t.Object({ userId: t.String() }),
      body: 'user.model.body.update',
    },
  )
  .delete(
    '/deleteUser/:userId',
    async ({ params: { userId } }) => {
      return await deleteUser(userId);
    },
    {
      params: t.Object({ userId: t.String() }),
    },
  );
