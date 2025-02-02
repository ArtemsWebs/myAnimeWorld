import { createGenres, getAllGenres, getGenresForAnime } from '../dataAccess';

export const genresAutocomplete = async () => {
  const foreignGenres = await fetch(
    `https://api.jikan.moe/v4/genres/anime`,
  ).then((response) => response.json());
  return createGenres(foreignGenres);
};

export const genresAll = () => {
  return getAllGenres();
};

export const genresForAnime = (animeId: number) => {
  return getGenresForAnime(animeId);
};
