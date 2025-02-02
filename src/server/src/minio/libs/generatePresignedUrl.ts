import minioClient from '../index.';

export const getFile = async (bucketName: string, fileName: string) => {
  try {
    await minioClient.statObject(bucketName, fileName);
  } catch (error) {
    console.error(error);
    return null;
  }
  return await minioClient.getObject(bucketName, fileName);
};
