import InfoRow from '@/app/ui/InfoRow/InfoRow';
import Typography from '@/app/ui/Typography';
import Chips from '@/app/ui/Chips/Chips';
import AnimePlayer from '@/app/home/animes/anime/[animeId]/_component/AnimePlayer/AnimePlayer';
import Accordion from '@/app/ui/Accordion/Accordion';
import CommentTree from '@/app/home/animes/anime/[animeId]/_component/CommentTree/CommentTree';
import { Suspense } from 'react';
import { CiEdit } from 'react-icons/ci';
import { AnimeModelResponse } from '@/server/src/anime/model/anime.model';
import Link from 'next/link';

interface AnimeCardProps {
  animeFullInfo?: AnimeModelResponse;
}

//@TODO формат mkv не работает в video.js
const AnimeCard = ({ animeFullInfo }: AnimeCardProps) => {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<></>}>
        <div className="w-full h-full min-h-[calc(50.25vw-147px)]">
          <iframe
            className={
              'w-full h-[50.25vw] absolute top-0 object-cover brightness-50'
            }
            src={
              animeFullInfo?.trailer?.embed_url
                ? animeFullInfo?.trailer?.embed_url +
                  '&autoplay=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1&rel=0'
                : ''
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </Suspense>
      <div className={'px-[25%] flex-col items-center'}>
        <div className={'w-full flex gap-10 text-white pt-10'}>
          <img
            src={animeFullInfo?.images?.jpg?.large_image_url}
            className={'rounded-lg'}
          />
          <div className={'w-[700px]'}>
            <div>
              <div className="flex gap-5 justify-start">
                <Typography variant={'title'}>
                  {animeFullInfo?.title}
                </Typography>
                <Link href={`/home/animes/anime/${animeFullInfo?.id}/edit`}>
                  <CiEdit size={40} />
                </Link>
              </div>
              <div className={'flex gap-3'}>
                {animeFullInfo?.genres?.map((gener) => (
                  <Chips key={gener.malId} chipsName={gener.name} />
                ))}
              </div>
            </div>
            <InfoRow
              title={'Рейтинг'}
              value={animeFullInfo?.rank}
              className={'py-1'}
            />
            <InfoRow
              title="Сезон"
              value={animeFullInfo?.season}
              className={'py-1'}
            />
            <InfoRow
              title="Эпизоды"
              value={animeFullInfo?.episodes}
              className={'py-1'}
            />
            <InfoRow
              title="Возрастной рейтинг"
              value={animeFullInfo?.rating}
              className={'py-1'}
            />
            <InfoRow
              title="Режисеры"
              value={animeFullInfo?.producers
                ?.map((producer) => producer.name)
                ?.join(', ')}
              className={'py-1'}
            />
            <InfoRow
              title="Студии"
              value={animeFullInfo?.studios
                ?.map((studio) => studio.name)
                ?.join(', ')}
              className={'py-1'}
            />
            <InfoRow
              title="Лицензоры"
              value={animeFullInfo?.licensors
                ?.map((licensor) => licensor.name)
                ?.join(', ')}
              className={'py-1'}
            />
          </div>
        </div>
        <AnimePlayer
          animeFullInfo={animeFullInfo}
          className={'pt-6 pb-4'}
          playerClassname={'flex'}
        />
        <div className="flex flex-col gap-10 pt-10">
          <Accordion title="Хронология">Контент</Accordion>
          <Accordion title="Персонажи">Контент</Accordion>
        </div>
        <CommentTree />
      </div>
    </div>
  );
};

export default AnimeCard;
