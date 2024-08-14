import { createUserDB, getAllUser, getUser, updateUserDB } from '../dataAccess';
import { UserTypescriptAnnotation } from '../model/user.model';
import { nanoid } from 'nanoid';
import { putFile } from '../../minio/libs/putFile';

export const getDomainUser = async (email: string) => {
  return await getUser(email);
};
export const getAllDomainUsers = async () => {
  return await getAllUser();
};

export const createUser = async (body: UserTypescriptAnnotation) => {
  const uniqueFileName = `${nanoid(5)}-${body?.image.name}`;
  await putFile(body.image, uniqueFileName);
  return await createUserDB(body, uniqueFileName);
};
export const updateUser = async (
  userId: string,
  body: UserTypescriptAnnotation,
) => {
  return await updateUserDB(userId, body);
};
