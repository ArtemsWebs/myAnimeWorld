import { Elysia, t } from 'elysia';
import { getFileForFront } from '../domain';

export const minioRouters = new Elysia({ prefix: '/minio' })
  .onParse(({ request, contentType }) => {
    if (contentType.includes('multipart/form-data')) return request.formData();
  })
  .get('/uploadImageFile/:fileName', async ({ params: { fileName } }) => {
    return await getFileForFront(fileName);
  });
