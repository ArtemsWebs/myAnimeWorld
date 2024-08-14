import {
  changePermissionDB,
  createNewPermissionDB,
  deletePermissionDB,
  getAllPermissionBD,
} from '../dataAccess';

import { PermissionTypescriptAnnotation } from '../model/permession.modal';

export const getAllPermission = async () => {
  return await getAllPermissionBD();
};

export const changePermission = async (
  permissionId: number,
  body: PermissionTypescriptAnnotation,
) => {
  return await changePermissionDB(permissionId, body);
};

export const createPermission = async (
  body: PermissionTypescriptAnnotation,
) => {
  return await createNewPermissionDB(body);
};

export const deletePermission = async (permissionId: number) => {
  return await deletePermissionDB(permissionId);
};
