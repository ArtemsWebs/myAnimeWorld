import prismaDb from '../../../../../../lib/prismaDb';

export const getUser = async (email: string) => {
  const user = await prismaDb.user.findUnique({
    include: {
      roles: { select: { permession: true, name: true, encrypt: true } },
    },
    where: { email: email },
  });
  return user;
};
export const getAllUser = async () => {
  const usersRoles = await prismaDb.user.findMany({
    include: {
      roles: { select: { permession: true, name: true, encrypt: true } },
    },
  });
  return usersRoles;
};
