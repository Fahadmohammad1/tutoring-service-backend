import { Reviews } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const addReview = async (userId: string, reviewData: Reviews) => {
  const findReview = await prisma.reviews.findFirst({
    where: {
      userId: userId,
    },
  });

  if (findReview?.userId === userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review already added');
  }

  return await prisma.reviews.create({
    data: reviewData,
  });
};

export const ReviewService = {
  addReview,
};
