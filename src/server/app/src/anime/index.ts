import { Elysia } from 'elysia';
import prismaDb from '../../../../../lib/prismaDb';
import { AnimeT } from './types';

export const animeRouters = new Elysia().get(
  '/anime/:id',
  ({ params: { id } }) => {
    const anime = undefined;
    return id;
    // const anime = await prismaDb.animes.findUnique({ where: { animeId } });
    // try {
    //   if (!anime) {
    //     const foreignAnime = await fetch(
    //       `https://api.jikan.moe/v4/anime/${animeId}/full`,
    //     ).then((response) => response.json());
    //
    //     if (!foreignAnime) {
    //       throw new Error('Аниме не найдено');
    //     }
    //
    //     const animeData = foreignAnime.data as AnimeT;
    //
    //     const resultAnime = await prismaDb.animes.create({
    //       data: {
    //         malId: animeData.mal_id,
    //         url: animeData.url,
    //         title: animeData.title,
    //         titleEnglish: animeData.title_english,
    //         titleJapanese: animeData.title_japanese,
    //         episodes: animeData.episodes,
    //         status: animeData.status,
    //         source: animeData.source,
    //         trailer: animeData.trailer,
    //         aring: animeData.airing,
    //         type: animeData.type,
    //         duration: animeData.duration,
    //         score: animeData.score,
    //         scoredBy: animeData.scored_by,
    //         rank: animeData.rank,
    //         popularity: animeData.popularity,
    //         members: animeData.members,
    //         favorites: animeData.favorites,
    //         background: animeData.background,
    //       },
    //     });
    //     return resultAnime;
    //   } else {
    //     return anime;
    //   }
    // } catch {}
  },
);
// model Animes {
//   id            String   @id @default(cuid())
//   malId         Int
//   title         String
//   url           String
//   description   String
//   titleEnglish  String
//   titleJapanese String
//   source        String
//   episodes      Int
//   trailer       Json
//   status        String
//   airing        Boolean
//   rating        Int
//   score         Int
//   scoredBy      Int
//   rank          Int
//   popularity    Int
//   members       Int
//   favorites     Int
//   synopsis      String
//   background    String
//   season        String
//   type          String
//   videoUrl      String
//   thumbnaiUrl   String
//   duration      String
//   genresIds     String[]
//   licensorsIds  String[]
//   producersIds  String[]
// }
