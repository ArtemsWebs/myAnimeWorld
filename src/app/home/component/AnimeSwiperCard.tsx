'use client';
import { AnimeT } from '@/app/home/types';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';
import InfoRow from '@/app/_widget/InfoRow/InfoRow';

interface AnimeSwiperCardProps extends ComponentPropsWithoutRef<'div'> {
  anime: AnimeT;
}

const AnimeSwiperCard = ({ anime, ...props }: AnimeSwiperCardProps) => {
  const router = useRouter();
  return (
    <div
      {...props}
      key={anime.mal_id}
      className={'group w-[300px] h-[400px] cursor-pointer relative'}
      onClick={() => router.push(`/home/anime/${anime.mal_id}`)}
    >
      <img
        src={anime.images.jpg?.large_image_url}
        className={'object-cover w-[300px] h-[400px] rounded-lg'}
      />
      <div
        className={
          'absolute transition ease-in-out  w-full h-full opacity-0  bg-black top-0 hover:opacity-80 duration-400 text-white px-4 pb-4'
        }
      >
        <div className={'flex flex-col  h-full justify-end'}>
          <InfoRow title="Название" value={anime.title_english} />
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
