import { Elysia } from 'elysia';
import prismaDb from '../../../../lib/prismaDb';
import { AnimeT } from './anime/types';

const app = new Elysia()
  .get('/anime/:animeId', async ({ params: { animeId } }) => {
    const anime = await prismaDb.animes.findUnique({
      include: {
        genres: true,
        studios: true,
        licensors: true,
        producers: true,
      },
      where: { id: Number(animeId) },
    });
    try {
      if (!anime) {
        const foreignAnime = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/full`,
        ).then((response) => response.json());

        if (!foreignAnime) {
          throw new Error('Аниме не найдено');
        }

        const animeData = foreignAnime.data as AnimeT;

        return await prismaDb.animes.create({
          include: {
            genres: true,
            studios: true,
            licensors: true,
            producers: true,
          },
          data: {
            id: animeData.mal_id,
            malId: animeData.mal_id,
            url: animeData.url,
            title: animeData.title,
            titleEnglish: animeData.title_english,
            titleJapanese: animeData.title_japanese,
            episodes: animeData.episodes,
            status: animeData.status,
            source: animeData.source,
            trailer: animeData.trailer,
            airing: animeData.airing,
            type: animeData.type,
            duration: animeData.duration,
            score: animeData.score,
            scoredBy: animeData.scored_by,
            rank: animeData.rank,
            rating: animeData.rating,
            season: animeData.season,
            popularity: animeData.popularity,
            images: animeData.images,
            members: animeData.members,
            favorites: animeData.favorites,
            background: animeData.background,
            producers: {
              connectOrCreate: [
                ...animeData.producers.map((studio) => ({
                  where: { id: studio.mal_id },
                  create: {
                    id: studio.mal_id,
                    malId: studio.mal_id,
                    url: studio.url,
                    type: studio.type,
                    name: studio.name,
                  },
                })),
              ],
            },
            licensors: {
              connectOrCreate: [
                ...animeData.licensors.map((studio) => ({
                  where: { id: studio.mal_id },
                  create: {
                    id: studio.mal_id,
                    malId: studio.mal_id,
                    url: studio.url,
                    type: studio.type,
                    name: studio.name,
                  },
                })),
              ],
            },
            studios: {
              connectOrCreate: [
                ...animeData.studios.map((studio) => ({
                  where: { id: studio.mal_id },
                  create: {
                    id: studio.mal_id,
                    malId: studio.mal_id,
                    url: studio.url,
                    type: studio.type,
                    name: studio.name,
                  },
                })),
              ],
            },
            genres: {
              connectOrCreate: [
                ...animeData.genres.map((genres) => ({
                  where: { id: genres.mal_id },
                  create: {
                    id: genres.mal_id,
                    malId: genres.mal_id,
                    url: genres.url,
                    type: genres.type,
                    name: genres.name,
                  },
                })),
              ],
            },
          },
        });
      } else {
        return anime;
      }
    } catch (e) {
      console.log(e);
    }
  })
  .get('/anime/genres/autocomplete', async () => {
    const foreignGenres = await fetch(
      `https://api.jikan.moe/v4/genres/anime`,
    ).then((response) => response.json());
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
  })
  .get('/anime/genres/:animeId', async ({ params: { animeId } }) => {
    return prismaDb.genres.findMany({
      where: { animes: { id: Number(animeId) } },
    });
  })
  .get('/user/me', async ({ query: { email } }) => {
    return prismaDb.user.findUnique({
      where: { email: email },
    });
  })
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
