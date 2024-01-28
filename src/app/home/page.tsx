'use client';

import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Show from '@/app/_widget/Show/Show';
import { Session } from 'next-auth';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    getSession().then((res) => {
      if (!res) {
        router.push('/auth');
      }
      setSession(res);
    });
  }, [getSession]);

  console.log(currentUser);

  return (
    <Show when={!!session}>
      <div className="text-white">{`Добро пожаловать, ${currentUser?.name}`}</div>
      <button
        className="w-full h-24 bg-white"
        onClick={async () => {
          await signOut({ callbackUrl: '/auth' });
        }}
      >
        ВЫЙТИ
      </button>
    </Show>
  );
};
export default Home;
