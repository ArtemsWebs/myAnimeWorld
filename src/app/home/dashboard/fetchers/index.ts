import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';

export const getAllRoles = async () => {
  return fetcherClient.api.v1.roles.allRoles.get();
};
