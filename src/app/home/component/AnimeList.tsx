import { Swiper, SwiperSlide } from 'swiper/react';

import { useMemo } from 'react';

type ImagesFormat = {
  image_url?: string;
  medium_image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
};

type Images = {
  jpg?: ImagesFormat;
  webp?: ImagesFormat;
};

type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: ImagesFormat;
};
type Title = {
  type: string;
  title: string;
};
type DayInNumber = {
  day: number;
  month: number;
  year: number;
};

type Aired = {
  from: Date;
  to: Date;
  prop: {
    from: DayInNumber;
    to: DayInNumber;
  };
};

type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AnimeT = {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title?: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms: any[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired?: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  genres: Genre[];
};

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
  const sliceAnimeListForDelimetr = useMemo(
    () => splitDataForSlides(8, animeList),
    [animeList],
  );

  console.log(sliceAnimeListForDelimetr);
  return (
    <div className={'w-full min-h-5'}>
      <p className={'text-2xl text-white'}>{listTitle}</p>
      <Swiper
        pagination={true}
        navigation={false}
        effect="fade"
        loop={true}
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={1}
      >
        {sliceAnimeListForDelimetr.map((animes, index) => (
          <SwiperSlide
            className={'w-full flex'}
            style={{ display: 'flex', gap: '32px' }}
            key={index}
          >
            {animes.map((anime) => (
              <div key={anime.mal_id} className={'w-[300px] h-[400px]'}>
                <img
                  src={anime.images.jpg?.large_image_url}
                  className={'object-cover w-[300px] h-[400px] rounded-lg'}
                />
              </div>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AnimeList;
