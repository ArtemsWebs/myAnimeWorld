import minioClient, { bucketImages } from '../index.';

export const getFileMinio = async (bucketName: string, fileName: string) => {
  try {
    await minioClient.statObject(bucketName, fileName);
  } catch (error) {
    console.error(error);
    return null;
  }
  return await minioClient.getObject(bucketName, fileName);
};

export const putFileMinio = async (file: File, uniqueName: string) => {
  const fileArrayBuffer = await file.arrayBuffer();
  await minioClient.putObject(
    bucketImages,
    uniqueName,
    Buffer.from(fileArrayBuffer),
    file.size,
  );
};

export const deleteFileMinio = async (uniqueName: string) => {
  try {
    await minioClient.removeObject(bucketImages, uniqueName);
  } catch (error) {
    console.log(error);
  }
};
