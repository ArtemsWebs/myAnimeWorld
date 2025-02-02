import prismaDb from '../../../../../lib/prismaDb';
import { UserModelBodyCreate, UserModelBodyUpdate } from '../model/user.model';
import { ServerError } from '@/server/lib/serverError';

export const getUser = async (email: string) => {
  const user = await prismaDb.user.findUnique({
    omit: {
      emailVerified: true,
      hashedPassword: true,
    },
    include: {
      roles: {
        select: { permission: true, name: true, description: true, id: true },
      },
      userImage: true,
    },
    where: { email: email },
  });
  return user;
};

export const getAllUser = async () => {
  const usersRoles = await prismaDb.user.findMany({
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
    include: {
      roles: {
        select: { permission: true, name: true, description: true, id: true },
      },
      userImage: true,
    },
  });
  return usersRoles;
};

export const createUserDB = async (
  body: UserModelBodyCreate,
  uniqueFileName: string,
) => {
  try {
    const createdUser = await prismaDb.user.create({
      data: {
        roles: { connect: body.roles.map((roleId) => ({ id: roleId })) },
        name: body.name,
        email: body.email,
        hashedPassword: body.hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    if (body.image) {
      await prismaDb.file.create({
        data: {
          bucket: 'images',
          fileName: uniqueFileName,
          originalName: body.image.name,
          size: body.image.size,
          userId: createdUser.id,
        },
      });
    }
    return createdUser;
  } catch (e) {
    return e;
  }
};

export const updateUserDB = async ({
  userId,
  body,
  uniqueFileName,
  updateFile = true,
}: {
  userId: string;
  body: UserModelBodyUpdate;
  uniqueFileName?: string;
  updateFile?: boolean;
}) => {
  console.log(body.image);
  try {
    const updatedUser = await prismaDb.user.update({
      where: { id: userId },
      data: {
        roles: {
          connect: body.roles.map((roleId) => ({ id: Number(roleId) })),
        },
        name: body.name,
        email: body.email,
        hashedPassword: body.hashedPassword,
        updatedAt: new Date().toISOString(),
      },
    });
    if (body.image?.name && uniqueFileName) {
      await prismaDb.file.upsert({
        where: { userId },
        update: {
          bucket: 'images',
          fileName: uniqueFileName,
          originalName: body.image.name,
          size: body.image.size,
          userId: userId,
        },
        create: {
          bucket: 'images',
          fileName: uniqueFileName,
          originalName: body.image.name,
          size: body.image.size,
          userId: userId,
        },
      });
    }
    if (!body.image && !uniqueFileName && updateFile) {
      await prismaDb.file.update({
        where: { userId },
        data: {
          user: { disconnect: true },
        },
      });
    }
    return updatedUser;
  } catch (e) {
    return e;
  }
};

export const deleteUserDB = async (userId: string, isDeleteFile: boolean) => {
  if (!isDeleteFile) {
    await prismaDb.file.delete({ where: { userId } });
  }
  const deletedUser = await prismaDb.user.delete({ where: { id: userId } });
  return deletedUser;
};
