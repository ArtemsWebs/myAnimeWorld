import prismaDb from '../../../../../lib/prismaDb';
import { RoleBody } from '../model/role.model';

export const getAllRoles = async () => {
  const rolesWithpermission = await prismaDb.role.findMany({
    include: {
      permission: { select: { name: true, description: true, id: true } },
    },
  });
  return rolesWithpermission;
};

export const changeRolePermissionDB = async (
  roleId: number,
  body: RoleBody,
) => {
  await prismaDb.role.update({
    where: { id: roleId },
    include: {
      permission: true,
    },
    data: {
      permission: { set: [] },
    },
  });
  const updatedRolePermissions = await prismaDb.role.update({
    where: { id: roleId },
    include: {
      permission: true,
    },
    data: {
      permission: { connect: body.permission.map((per) => ({ id: per.id })) },
      updatedAt: body.updatedAt,
      createdAt: body.createdAt,
      name: body.name,
      isDefaultUser: body.isDefaultUser,
      description: body.description,
    },
  });
  return updatedRolePermissions;
};

export const createNewRoleDB = async (body: RoleBody) => {
  const createdRole = await prismaDb.role.create({
    include: {
      permission: true, // Include all posts in the returned object
    },
    data: {
      permission: { connect: body.permission.map((per) => ({ id: per.id })) },
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
      name: body.name,
      isDefaultUser: body.isDefaultUser,
      description: body.description,
    },
  });
  return createdRole;
};

export const deleteRoleDB = async (roleId: number) => {
  const deleteRole = await prismaDb.role.delete({
    include: {
      permission: true,
    },
    where: { id: roleId },
  });
  return deleteRole;
};
