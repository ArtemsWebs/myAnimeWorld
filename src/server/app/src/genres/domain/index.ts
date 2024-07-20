import { createGenres, getGenresForAnime } from '../dataAccess';

export const genresAutocomplete = async () => {
  const foreignGenres = await fetch(
    `https://api.jikan.moe/v4/genres/anime`,
  ).then((response) => response.json());
  return createGenres(foreignGenres);
};

export const genresForAnime = (animeId: number) => {
  return getGenresForAnime(animeId);
};
