import { Elysia, t } from 'elysia';
import {
  changePermission,
  createPermission,
  deletePermission,
  getAllPermission,
} from '../domain';
import { PermissionModelDTO } from '../model/permession.modal';

export const permissionRouters = new Elysia({ prefix: '/permission' })
  .use(PermissionModelDTO)
  .get(
    '/allPermissions',
    async () => {
      return await getAllPermission();
    },
    {
      response: 'permissionAll.model.response',
    },
  )
  .put(
    '/changePermission/:permissionId',
    async ({ params: { permissionId }, body }) => {
      return await changePermission(permissionId, body);
    },
    {
      params: t.Object({
        permissionId: t.Numeric(),
      }),
      body: 'permission.model',
      response: 'permission.model.response',
    },
  )
  .post(
    '/createPermission',
    async ({ body }) => {
      return await createPermission(body);
    },
    { body: 'permission.model', response: 'permission.model.response' },
  )
  .delete(
    '/deletePermission/:permissionId',
    async ({ params: { permissionId } }) => {
      return await deletePermission(permissionId);
    },
    {
      params: t.Object({ permissionId: t.Numeric() }),
      response: 'permission.model.response',
    },
  );
