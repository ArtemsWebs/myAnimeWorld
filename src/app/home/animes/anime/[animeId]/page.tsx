'use client';
import AnimeCard from '@/app/home/animes/anime/[animeId]/_component/AnimeCard/AnimeCard';
import useSWR from 'swr';
import { Suspense } from 'react';
import { getAnimeById } from '@/app/home/animes/fetchers/animeFetchers';

interface AnimePageProps {
  params: { animeId: string };
}

const AnimePage = ({ params }: AnimePageProps) => {
  const { data: animeData } = useSWR(params.animeId, async (animeId) => {
    const { data: animeData } = await getAnimeById(animeId);
    return animeData;
  });
  return (
    <Suspense fallback={<>Загрузка</>}>
      <AnimeCard animeFullInfo={animeData ?? undefined} />
    </Suspense>
  );
};

export default AnimePage;
