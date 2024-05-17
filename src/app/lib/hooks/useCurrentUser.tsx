'use client';
import { axiosInstance } from '@/app/api/axios/axiosInstans';
import useSWR from 'swr';

const getCurrentUser = async () => {
  return await axiosInstance.get('/api/currentUser');
};

export const useCurrentUser = () => {
  const {
    data: currentUser,
    error,
    mutate,
    isValidating,
    isLoading,
  } = useSWR('getUser', getCurrentUser);

  return {
    currentUser: currentUser?.data.currentUser,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};
