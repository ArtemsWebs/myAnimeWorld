import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';
import {
  UserModelBodyCreate,
  UserModelBodyUpdate,
} from '@/server/src/user/model/user.model';

export const getAllUser = async (_key: string) => {
  return await fetcherClient.api.v1.user.allUsers.get();
};

export const createUser = async (body: UserModelBodyCreate) => {
  return await fetcherClient.api.v1.user.createUser.post(body);
};

export const updateUser = async (body: UserModelBodyUpdate, userId: string) => {
  return await fetcherClient.api.v1.user.updateUser({ userId }).put(body);
};
