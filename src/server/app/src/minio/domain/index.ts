import { getFile } from '../libs/getFile';

export const getFileForFront = async (imageName: string) => {
  return await getFile('images', imageName);
};
