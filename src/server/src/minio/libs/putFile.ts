import minioClient, { bucketImages } from '../index.';

export const putFile = async (file: File, uniqueName: string) => {
  const fileArrayBuffer = await file.arrayBuffer();
  await minioClient.putObject(
    bucketImages,
    uniqueName,
    Buffer.from(fileArrayBuffer),
    file.size,
  );
};
