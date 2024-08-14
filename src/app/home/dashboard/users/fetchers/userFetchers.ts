import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';

export const getAllUser = async (_key: string) => {
  return await fetcherClient.api.v1.user.allUsers.get();
};
