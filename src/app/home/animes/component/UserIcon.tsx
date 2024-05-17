'use client';
import { FaUser } from 'react-icons/fa6';
import { useState } from 'react';
import { UserDrawer } from '@/app/home/animes/component/UserDrawer';

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
