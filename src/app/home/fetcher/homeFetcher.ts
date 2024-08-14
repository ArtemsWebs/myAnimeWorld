import { fetcherClient } from '@/app/lib/apiFetcher/apiFetcher';

export const getMe = async (userEmail: string) => {
  return await fetcherClient.api.v1.user.me.get({
    query: { email: userEmail },
  });
};

export const uploadImageFile = (fileName: string) => {
  return fetcherClient.api.v1.minio.uploadImageFile({ fileName }).get();
};
