import { Elysia, t } from 'elysia';
import {
  changeRolePermission,
  createNewRole,
  deleteRole,
  getAllDomainRoles,
} from '../domain';
import { RoleModelDTO, RoleTypescriptAnnotation } from '../model/role.model';

export const rolesRouters = new Elysia({ prefix: '/roles' })
  .use(RoleModelDTO)
  .get('/allRoles', async () => {
    return await getAllDomainRoles();
  })
  .put(
    '/changeRolePermission/:roleId',
    async ({ params: { roleId }, body }) => {
      return await changeRolePermission(
        roleId,
        body as RoleTypescriptAnnotation,
      );
    },
    {
      params: t.Object({
        roleId: t.Numeric(),
      }),
      body: 'role.model',
    },
  )
  .post(
    '/createRole',
    async ({ body }) => {
      return await createNewRole(body as RoleTypescriptAnnotation);
    },
    { body: 'role.model' },
  )
  .delete(
    '/deleteRole/:roleId',
    async ({ params: { roleId } }) => {
      return await deleteRole(roleId);
    },
    {
      params: t.Object({
        roleId: t.Numeric(),
      }),
    },
  );
