'use client';

import { useState } from 'react';
import Show from '@/app/ui/Show/Show';
import AnimeList from '@/app/home/animes/component/AnimeList';

import { axiosInstance } from '@/app/api/axios/axiosInstans';
import useSWR from 'swr';
import { AnimeRequestParams } from '@/app/home/animes/types';
import { useUserStore } from '@/app/store/User';

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
  const user = useUserStore((state) => state.userInfo);

  const [page, setPage] = useState(1);

  const { data: animes } = useSWR(
    { page, limit: 24, status: 'airing', order_by: 'popularity' },
    animeFetcher,
  );

  return (
    <Show when={!!user}>
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
