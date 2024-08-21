import { Elysia, t } from 'elysia';
import {
  changeRolePermission,
  createNewRole,
  deleteRole,
  getAllDomainRoles,
} from '../domain';
import { RoleModelDTO, RoleBody } from '../model/role.model';

export const rolesRouters = new Elysia({ prefix: '/roles' })
  .use(RoleModelDTO)
  .get(
    '/allRoles',
    async () => {
      return await getAllDomainRoles();
    },
    {
      response: 'roleAll.model.response',
    },
  )
  .put(
    '/changeRolePermission/:roleId',
    async ({ params: { roleId }, body }) => {
      return await changeRolePermission(roleId, body as RoleBody);
    },
    {
      params: t.Object({
        roleId: t.Numeric(),
      }),
      body: 'role.model',
      response: 'roleUpdate.model.response',
    },
  )
  .post(
    '/createRole',
    async ({ body }) => {
      return await createNewRole(body as RoleBody);
    },
    { body: 'role.model', response: 'roleUpdate.model.response' },
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
      response: 'roleUpdate.model.response',
    },
  );
