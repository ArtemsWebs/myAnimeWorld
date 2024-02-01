'use client';

import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Show from '@/app/_widget/Show/Show';
import { Session } from 'next-auth';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import AnimeList from '@/app/home/component/AnimeList';

import { axiosInstance } from '@/app/api/axios/axiosInstans';
import useSWR from 'swr';

type AnimeRequestParams = {
  page?: number;
  limit?: number;
  type?:
    | 'tv'
    | 'movie'
    | 'ova'
    | 'special'
    | 'ona'
    | 'music'
    | 'cm'
    | 'pv'
    | 'tv_special';
  status?: 'airing' | 'complete' | 'upcoming';
  order_by:
    | 'mal_id'
    | 'title'
    | 'start_date'
    | 'end_date'
    | 'episodes'
    | 'score'
    | 'scored_by'
    | 'rank'
    | 'popularity'
    | 'members'
    | 'favorites';
};

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

  const [page, setPage] = useState(1);

  const pagePlusOneHandler = useCallback(() => {
    setPage((prevState) => prevState + 1);
  }, []);

  const pageMinusOneHandler = useCallback(() => {
    setPage((prevState) => prevState - 1);
  }, []);

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
          loop={true}
          src="/videos/videoAnime.mp4"
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
export default Home;
