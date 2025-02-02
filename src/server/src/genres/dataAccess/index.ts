import prismaDb from '../../../../../lib/prismaDb';

export const createGenres = (foreignGenres: any) => {
  return prismaDb.genres.createMany({
    data: [
      ...foreignGenres.data.map((genre) => ({
        id: genre.mal_id,
        malId: genre.mal_id,
        name: genre.name,
        url: genre.url,
      })),
    ],
  });
};

export const getAllGenres = () => {
  return prismaDb.genres.findMany();
};

export const getGenresForAnime = (animeId: number) => {
  return prismaDb.genres.findMany({
    include: {
      animes: true,
    },
    where: { animes: { some: { id: animeId } } },
  });
};
