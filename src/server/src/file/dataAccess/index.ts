import prismaDb from '../../../../../lib/prismaDb';

export const getFileByUserId = async (userId: string) => {
  return prismaDb.file.findUnique({ where: { userId } });
};
