'use client';
import AnimeCard from '@/app/home/anime/[animeId]/_component/AnimeCard/AnimeCard';
import { axiosInstance } from '@/app/api/axios/axiosInstans';
import useSWR from 'swr';

const getAnimeById = async (animeId: number) => {
  if (!animeId) return undefined;
  return axiosInstance.get('/home/anime/{id}/api', {
    params: { animeId: animeId },
  });
};

interface AnimePageProps {
  params: { animeId: string };
}

const AnimePage = ({ params }: AnimePageProps) => {
  const { data: animeData } = useSWR(params.animeId, getAnimeById);
  return <AnimeCard animeFullInfo={animeData?.data} />;
};

export default AnimePage;
