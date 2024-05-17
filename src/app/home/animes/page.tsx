'use client';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Show from '@/app/ui/Show/Show';
import { Session } from 'next-auth';
import AnimeList from '@/app/home/animes/component/AnimeList';

import { axiosInstance } from '@/app/api/axios/axiosInstans';
import useSWR from 'swr';
import { AnimeRequestParams } from '@/app/home/animes/types';

const animeFetcher = async ({
  page,
  limit,
  status,
  order_by,
}: AnimeRequestParams) => {
  return await axiosInstance
    .get('https://api.jikan.moe/v4/anime', {
      params: {
        page: page ?? 1,
        limit: limit ?? 24,
        status: status ?? 'airing',
        order_by: order_by ?? 'popularity',
      },
    })
    .then((res) => res.data);
};

const Animes = () => {
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  useEffect(() => {
    getSession().then((res) => {
      if (!res) {
        router.push('/auth');
      }
      setSession(res);
    });
  }, [getSession]);

  const [page, setPage] = useState(1);

  const { data: animes } = useSWR(
    { page, limit: 24, status: 'airing', order_by: 'popularity' },
    animeFetcher,
  );

  return (
    <Show when={!!session}>
      <div className="w-full min-h-[calc(50.25vw-147px)]">
        <video
          autoPlay={true}
          muted
          playsInline={true}
          loop={true}
          src="/videos/background/videoAnime.mp4"
          className={
            'w-full absolute top-0 object-cover brightness-50 h-[50.25vw]'
          }
        ></video>
      </div>
      <div className={'px-[48px] py-[32px]'}>
        <AnimeList animeList={animes?.data} listTitle="Онгоинги" />
      </div>
    </Show>
  );
};
export default Animes;
