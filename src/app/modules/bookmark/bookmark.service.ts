import { Bookmark } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const addToBookmark = async (
  data: Bookmark,
  userId: string
): Promise<Bookmark | null> => {
  data.userId = userId;

  const findItem = await prisma.bookmark.findFirst({
    where: {
      serviceId: data.serviceId,
    },
  });

  if (findItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already added');
  }

  return await prisma.bookmark.create({
    data,
  });
};

const getAllBookmark = async (id: string): Promise<Bookmark[] | null> => {
  return await prisma.bookmark.findMany({
    where: {
      userId: id,
    },
  });
};

const getSingleBookmark = async (id: string): Promise<Bookmark | null> => {
  const findItem = await prisma.bookmark.findFirst({
    where: {
      userId: id,
    },
  });

  if (findItem?.userId !== id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unauthorized Access');
  }

  return await prisma.bookmark.findUnique({
    where: {
      id,
    },
  });
};

const updateBookmark = async (
  id: string,
  quantity: number
): Promise<Bookmark | null> => {
  const findService = await prisma.bookmark.findUnique({
    where: {
      id,
    },
  });

  if (!findService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not available');
  }

  if (findService?.userId !== id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unauthorized Access');
  }

  return await prisma.bookmark.update({
    where: {
      id,
    },
    data: {
      quantity: quantity,
    },
  });
};

const deleteBookmark = async (id: string): Promise<Bookmark | null> => {
  const findItem = await prisma.bookmark.findFirst({
    where: {
      userId: id,
    },
  });

  if (findItem?.userId !== id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unauthorized Access');
  }

  return await prisma.bookmark.delete({
    where: {
      id,
    },
  });
};

export const BookmarkService = {
  addToBookmark,
  getAllBookmark,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
};
