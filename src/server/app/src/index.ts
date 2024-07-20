import { Elysia } from 'elysia';
import { animeRouters } from './anime/entry';
import { userRouters } from './user/entry';
import { genresRouters } from './genres/entry';

const app = new Elysia()
  .use(animeRouters)
  .use(genresRouters)
  .use(userRouters)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
