import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';
import { RoleBody } from '@/server/src/roles/model/role.model';

export const getAllRoles = async () => {
  return await fetcherClient.api.v1.roles.allRoles.get();
};

export const updateRole = async (roleId: number, roleInfo: RoleBody) => {
  return await fetcherClient.api.v1.roles
    .changeRolePermission({ roleId })
    .put(roleInfo);
};

export const createRole = async (roleInfo: RoleBody) => {
  return await fetcherClient.api.v1.roles.createRole.post(roleInfo);
};

export const deleteRole = async (roleId: number) => {
  return await fetcherClient.api.v1.roles.deleteRole({ roleId }).delete();
};
