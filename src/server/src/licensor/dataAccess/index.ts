import prismaDb from '../../../../../lib/prismaDb';

export const getDbAllLicensor = async () => {
  const allLicensors = prismaDb.licensors.findMany();
  return allLicensors;
};
