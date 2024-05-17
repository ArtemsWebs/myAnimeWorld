import { Swiper, SwiperSlide } from 'swiper/react';

import { useMemo } from 'react';
import { AnimeT } from '@/app/home/animes/types';
import AnimeSwiperCard from '@/app/home/animes/component/AnimeSwiperCard';

interface AnimeListProps {
  animeList?: AnimeT[];
  listTitle?: string;
}

const splitDataForSlides = (delimetr: number, animeList?: AnimeT[]) => {
  if (!animeList) return [];
  const parts = animeList.length / delimetr;
  const emptyPartsArray = Array(parts).fill(null) as null[];
  return emptyPartsArray.map((_, index) => {
    return animeList.slice(delimetr * index, delimetr * (index + 1));
  });
};

const AnimeList = ({ animeList, listTitle }: AnimeListProps) => {
  const sliceAnimeListForDelimiter = useMemo(
    () => splitDataForSlides(8, animeList),
    [animeList],
  );

  return (
    <div className={'w-full min-h-5'}>
      <p className={'text-2xl text-white'}>{listTitle}</p>
      <Swiper
        mousewheel={true}
        keyboard={true}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        navigation={false}
        effect="fade"
        loop={true}
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={1}
      >
        {sliceAnimeListForDelimiter.map((animes, index) => (
          <SwiperSlide
            className={'w-full flex'}
            style={{ display: 'flex', gap: '32px' }}
            key={index}
          >
            {animes.map((anime) => (
              <AnimeSwiperCard anime={anime} key={anime.mal_id} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AnimeList;
