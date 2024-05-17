'use client';
import AnimeCard from '@/app/home/animes/anime/[animeId]/_component/AnimeCard/AnimeCard';
import { axiosInstance } from '@/app/api/axios/axiosInstans';
import useSWR from 'swr';
import { Suspense } from 'react';

const getAnimeById = async (animeId: number) => {
  if (!animeId) return undefined;
  return axiosInstance.get('/home/animes/anime/{id}/api', {
    params: { animeId: animeId },
  });
};

interface AnimePageProps {
  params: { animeId: string };
}

const AnimePage = ({ params }: AnimePageProps) => {
  const { data: animeData } = useSWR(params.animeId, getAnimeById);
  return (
    <Suspense fallback={<>Загрузка</>}>
      <AnimeCard animeFullInfo={animeData?.data} />
    </Suspense>
  );
};

export default AnimePage;
