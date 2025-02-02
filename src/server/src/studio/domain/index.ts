import { getDbAllStudio } from '@/server/src/studio/dataAccess';

export const getDomainAllStudio = async () => {
  return await getDbAllStudio();
};
