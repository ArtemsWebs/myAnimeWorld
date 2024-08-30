'use client';
import { AnimeT } from '@/app/home/animes/types';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';
import InfoRow from '@/app/ui/InfoRow/InfoRow';
import { AnimeModelResponse } from '@/server/src/anime/model/anime.model';

interface AnimeSwiperCardProps extends ComponentPropsWithoutRef<'div'> {
  anime: AnimeModelResponse;
}

const AnimeSwiperCard = ({ anime, ...props }: AnimeSwiperCardProps) => {
  const router = useRouter();
  return (
    <div
      {...props}
      className={'group w-[300px] h-[400px] cursor-pointer relative'}
      onClick={() => router.push(`/home/animes/anime/${anime.malId}`)}
    >
      <img
        src={anime.images.jpg?.large_image_url}
        className={'object-cover w-[300px] h-[400px] rounded-lg'}
      />
      <div
        className={
          'absolute transition ease-in-out rounded-lg  w-full h-full opacity-0  bg-black top-0 hover:opacity-80 duration-400 text-white px-4 pb-4'
        }
      >
        <div className={'flex flex-col  h-full justify-end'}>
          <InfoRow title="Название" value={anime.titleEnglish} />
          <InfoRow title="Статус" value={anime.status} />
          <InfoRow title="Сезон" value={anime.season} />
          <InfoRow title="Эпизод" value={anime.episodes} />
          <InfoRow title="Рейтинг" value={anime.rank} />
        </div>
      </div>
    </div>
  );
};

export default AnimeSwiperCard;
