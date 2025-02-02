import prismaDb from '../../../../../lib/prismaDb';

export const getDbAllProducer = async () => {
  const allLicensors = prismaDb.producers.findMany();
  return allLicensors;
};
