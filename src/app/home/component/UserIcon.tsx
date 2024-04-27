'use client';
import { FaUser } from 'react-icons/fa6';
import { Drawer } from '@/app/_widget/Drawer/Drawer';
import { useState } from 'react';
import { UserDrawer } from '@/app/home/component/UserDrawer';
import { axiosInstance } from '@/app/api/axios/axiosInstans';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';

const fetchUser = () => {
  return axiosInstance.get('/home/api/session');
};

export const UserIcon = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <div
        className="transition-colors duration-300 rounded-full w-[32px] h-[32px] bg-white flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
        onClick={() => setOpenDrawer((prevState) => !prevState)}
      >
        <FaUser />
      </div>
      <UserDrawer
        openDrawer={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
    </>
  );
};
