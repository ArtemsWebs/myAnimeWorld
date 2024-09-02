import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';
import {
  UserModelBodyCreate,
  UserModelBodyUpdate,
} from '@/server/src/user/model/user.model';

export const getAllUser = async (_key: string) => {
  return await fetcherClient.api.v1.user.all.get();
};

export const createUser = async (body: UserModelBodyCreate) => {
  return await fetcherClient.api.v1.user.create.post(body);
};

export const updateUser = async (body: UserModelBodyUpdate, userId: string) => {
  return await fetcherClient.api.v1.user.update({ userId }).put(body);
};

export const deleteUser = async (userId: string) => {
  return await fetcherClient.api.v1.user.deleteUser({ userId }).delete();
};
