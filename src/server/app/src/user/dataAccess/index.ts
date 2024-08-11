import prismaDb from '../../../../../../lib/prismaDb';
import { UserTypescriptAnnotation } from '../model/user.model';

export const getUser = async (email: string) => {
  const user = await prismaDb.user.findUnique({
    include: {
      roles: { select: { permission: true, name: true, description: true } },
      userImage: true,
    },
    where: { email: email },
  });
  return user;
};
export const getAllUser = async () => {
  const usersRoles = await prismaDb.user.findMany({
    include: {
      roles: { select: { permission: true, name: true, description: true } },
      userImage: true,
    },
  });
  return usersRoles;
};

export const createUserDB = async (
  body: UserTypescriptAnnotation,
  uniqueFileName: string,
) => {
  const createdUser = await prismaDb.user.create({
    data: {
      roles: { connect: { id: 3 } },
      name: body.name,
      email: body.email,
      hashedPassword: 'ewfefwefwf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
  const createdFile = await prismaDb.file.create({
    data: {
      bucket: 'images',
      fileName: uniqueFileName,
      originalName: body.image.name,
      size: body.image.size,
      userId: createdUser.id,
    },
  });

  return createdFile;
};

export const updateUserDB = async (
  userId: string,
  body: UserTypescriptAnnotation,
) => {};
