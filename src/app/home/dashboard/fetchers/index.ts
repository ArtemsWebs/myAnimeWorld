export const getAllRolesWithPermission = async (_key: string) => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/roles/api`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
};
