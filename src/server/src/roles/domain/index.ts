import {
  changeRolePermissionDB,
  createNewRoleDB,
  deleteRoleDB,
  getAllRoles,
} from '../dataAccess';
import { RoleTypescriptAnnotation } from '../model/role.model';

export const getAllDomainRoles = async () => {
  return await getAllRoles();
};

export const changeRolePermission = async (
  roleId: number,
  body: RoleTypescriptAnnotation,
) => {
  return await changeRolePermissionDB(roleId, body);
};

export const createNewRole = async (body: RoleTypescriptAnnotation) => {
  return await createNewRoleDB(body);
};

export const deleteRole = async (roleId: number) => {
  return await deleteRoleDB(roleId);
};
