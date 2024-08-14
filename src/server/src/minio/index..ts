import * as Minio from 'minio';
require('dotenv').config({ path: '.env.local' });

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_HOST ?? 'localhost',
  port: process.env.MINIO_PORT ? Number(process.env.MINIO_PORT) : 9000,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY ?? '',
  secretKey: process.env.MINIO_SECRET_KEY ?? '',
});

export const bucketImages = 'images';
export const bucketVideos = 'videos';

export async function minioInit() {
  const basketNames = [bucketImages, bucketVideos];

  const exists = await Promise.allSettled([
    minioClient.bucketExists(bucketImages),
    minioClient.bucketExists(bucketVideos),
  ]);

  exists.forEach(async (exist, index) => {
    if ('value' in exist && exist.value) {
      console.log('bucket in storage');
    } else {
      await minioClient.makeBucket(basketNames[index], 'us-east-1');
      console.log('Bucket ' + basketNames[index] + ' created in "us-east-1".');
    }
  });
}
// File to upload

export default minioClient;
