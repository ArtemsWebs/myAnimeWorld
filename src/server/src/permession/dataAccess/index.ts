import prismaDb from '../../../../../lib/prismaDb';
import { PermissionTypescriptAnnotation } from '../model/permession.modal';

export const getAllPermissionBD = async () => {
  const allPermissions = await prismaDb.permission.findMany({});
  return allPermissions;
};

export const changePermissionDB = async (
  permissionId: number,
  body: PermissionTypescriptAnnotation,
) => {
  const updatedRolePermissions = await prismaDb.permission.update({
    where: { id: permissionId },
    data: {
      updatedAt: body.updatedAt,
      createdAt: body.createdAt,
      name: body.name,
      description: body.description,
    },
  });
  return updatedRolePermissions;
};

export const createNewPermissionDB = async (
  body: PermissionTypescriptAnnotation,
) => {
  const createdRole = await prismaDb.permission.create({
    data: {
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
      name: body.name,
      description: body.description,
    },
  });
  return createdRole;
};

export const deletePermissionDB = async (permissionId: number) => {
  const deleteRole = await prismaDb.permission.delete({
    where: { id: permissionId },
  });
  return deleteRole;
};
