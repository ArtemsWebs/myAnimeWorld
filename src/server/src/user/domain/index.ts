import {
  createUserDB,
  deleteUserDB,
  getAllUser,
  getUser,
  updateUserDB,
} from '../dataAccess';
import { UserModelBodyCreate, UserModelBodyUpdate } from '../model/user.model';
import { nanoid } from 'nanoid';
import { putFile } from '../../minio/libs/putFile';
import { hash } from 'bcrypt';
import { deleteFileMinio } from '@/server/src/minio/libs/minioFileHandlers';
import { getFileByUserId } from '@/server/src/file/dataAccess';

export const getDomainUser = async (email: string) => {
  return await getUser(email);
};
export const getAllDomainUsers = async () => {
  return await getAllUser();
};

export const createUser = async (body: UserModelBodyCreate) => {
  let uniqueFileName = '';

  if (body.image) {
    uniqueFileName = `${nanoid(5)}-${body?.image.name}`;
    await putFile(body.image, uniqueFileName);
  }

  const hashedPassword = await hash(body.hashedPassword, 12);
  const userWithHashedPassword = {
    ...body,
    roles: body.roles.map((role) => Number(role)),
    hashedPassword,
  };

  return await createUserDB(userWithHashedPassword, uniqueFileName);
};
export const updateUser = async (userId: string, body: UserModelBodyUpdate) => {
  let userWithHashedPassword = body;

  if (body.hashedPassword) {
    const hashedPassword = await hash(body.hashedPassword, 12);
    userWithHashedPassword = {
      ...body,
      roles: body.roles.map((role) => Number(role)),
      hashedPassword,
    };
  }
  const userPhoto = await getFileByUserId(userId);
  let uniqueFileName = '';

  if (
    userPhoto &&
    body?.image?.size === userPhoto.size &&
    body.image.name === userPhoto.fileName
  ) {
    return await updateUserDB({
      userId,
      body: userWithHashedPassword,
      updateFile: false,
    });
  } else if (body.image) {
    uniqueFileName = `${nanoid(5)}-${body?.image.name}`;
    await putFile(body.image, uniqueFileName);
    return await updateUserDB({
      userId,
      body: userWithHashedPassword,
      uniqueFileName,
    });
  }
  if (!body.image && userPhoto?.fileName) {
    await deleteFileMinio(userPhoto.fileName);
  }

  return await updateUserDB({
    userId,
    body: userWithHashedPassword,
    updateFile: !!userPhoto?.fileName,
  });
};

export const deleteUser = async (userId: string) => {
  const userPhoto = await getFileByUserId(userId);
  if (userPhoto) {
    await deleteFileMinio(userPhoto.fileName);
  }
  return await deleteUserDB(userId, !userPhoto);
};
