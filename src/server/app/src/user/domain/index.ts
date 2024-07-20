import { getAllUser, getUser } from '../dataAccess';

export const getDomainUser = async (email: string) => {
  return await getUser(email);
};
export const getAllDomainUsers = async () => {
  return await getAllUser();
};
