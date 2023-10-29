import { SaveForLater } from '@prisma/client';
import prisma from '../../../shared/prisma';

const addToSaveLater = async (
  data: SaveForLater
): Promise<SaveForLater | null> => {
  return await prisma.saveForLater.create({
    data,
  });
};

const getAllSaveLater = async (): Promise<SaveForLater[] | null> => {
  return await prisma.saveForLater.findMany({});
};

const getSingleSaveLater = async (id: string): Promise<SaveForLater | null> => {
  return await prisma.saveForLater.findUnique({
    where: {
      id,
    },
  });
};

const deleteSaveLater = async (id: string): Promise<SaveForLater | null> => {
  return await prisma.saveForLater.delete({
    where: {
      id,
    },
  });
};

export const SaveForLaterService = {
  addToSaveLater,
  getAllSaveLater,
  getSingleSaveLater,
  deleteSaveLater,
};
