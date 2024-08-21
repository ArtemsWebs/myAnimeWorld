'use client';
import { ReactNode, useEffect } from 'react';
import { useUserStore } from '@/app/store/User';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getMe } from './fetcher/homeFetcher';

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const userInfo = useUserStore((state) => state.userInfo);
  const router = useRouter();
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);
  useEffect(() => {
    if (!userInfo) {
      getSession().then((res) => {
        if (!res?.user?.email) {
          router.push('/auth');
          return;
        }
        getMe(res?.user?.email).then((res) => {
          const userInfoResp = res.data;
          if (userInfoResp) {
            updateUserInfo({
              name: userInfoResp?.name,
              roles: userInfoResp.roles,
              email: userInfoResp?.email,
              permission: userInfoResp.roles.reduce(
                (accum: any[], role: any) => {
                  return [...accum, ...role.permission];
                },
                [],
              ),
            });
          }
        });
      });
    }
  }, [userInfo]);
  return <>{children}</>;
}
