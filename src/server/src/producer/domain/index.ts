import { getDbAllProducer } from '@/server/src/producer/dataAccess';

export const getDomainAllProducer = async () => {
  return await getDbAllProducer();
};
