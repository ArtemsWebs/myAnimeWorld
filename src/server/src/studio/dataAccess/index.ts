import prismaDb from '../../../../../lib/prismaDb';

export const getDbAllStudio = async () => {
  const allLStudios = await prismaDb.studios.findMany();
  return allLStudios;
};
