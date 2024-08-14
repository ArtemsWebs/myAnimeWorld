import { Elysia } from 'elysia';
import { animeRouters } from './anime/entry';
import { userRouters } from './user/entry';
import { genresRouters } from './genres/entry';
import { rolesRouters } from './roles/entry';
import { permissionRouters } from './permession/entry';
import { ServerError } from '../lib/serverError';
import { minioInit } from './minio/index.';
import { minioRouters } from './minio/entry';
import swagger from '@elysiajs/swagger';

minioInit();

const app = new Elysia({ prefix: '/api/v1' })
  .use(swagger())
  .error({
    ServerError,
  })
  .onError(({ code, error, set }) => {
    if (code === 'ServerError') {
      set.status = 404;
      return {
        name: code,
        httpCode: error.httpCode,
        description: error.message,
      };
    }
    console.log(error);
    return error;
  })
  .get('/hi', () => 'Hi Elysia')
  .use(rolesRouters)
  .use(animeRouters)
  .use(genresRouters)
  .use(userRouters)
  .use(permissionRouters)
  .use(minioRouters)
  .listen(4000);

export type ElysiaApp = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
