'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/app/store/User';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
        fetch(
          `${process.env.FRONTEND_BASE_URL}/home/api/me?email=${res?.user?.email}`,
          { headers: { 'Content-Type': 'application/json' } },
        ).then(async (res) => {
          const userInfoResp = await res.json();
          updateUserInfo({
            ...userInfoResp.userInfo,
            permission: userInfoResp.userInfo.roles.reduce(
              (accum: any[], role: any) => {
                return [...accum, ...role.permission];
              },
              [],
            ),
          });
        });
      });
    }
  }, [userInfo]);
  return <>{children}</>;
}
