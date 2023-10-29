import { SaveForLater } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const addToSaveLater = async (
  data: SaveForLater,
  userId: string
): Promise<SaveForLater | null> => {
  data.userId = userId;
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

const updateSaveLater = async (
  id: string,
  quantity: number
): Promise<SaveForLater | null> => {
  const findService = await prisma.saveForLater.findUnique({
    where: {
      id,
    },
  });

  if (!findService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not available');
  }
  return await prisma.saveForLater.update({
    where: {
      id,
    },
    data: {
      quantity: quantity,
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
  updateSaveLater,
};
