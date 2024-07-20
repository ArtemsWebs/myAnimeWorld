'use client';

import useSWR from 'swr';

const getAllUser = async (_key: string) => {
  return await fetch(
    `${process.env.FRONTEND_BASE_URL}/home/dashboard/users/api`,
  );
};

const Users = () => {
  const { data: allUsersWithRoles } = useSWR(
    '_getAllUsers',
    async (_key) => await getAllUser(_key),
  );
  console.log(allUsersWithRoles);
  return <></>;
};

export default Users;
