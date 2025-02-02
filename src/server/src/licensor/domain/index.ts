import { getDbAllLicensor } from '@/server/src/licensor/dataAccess';

export const getDomainAllLicensor = async () => {
  return await getDbAllLicensor();
};
