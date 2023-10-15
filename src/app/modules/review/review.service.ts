import { Reviews } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const addReview = async (
  userId: string,
  reviewData: Reviews
): Promise<Reviews | null> => {
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

const getAllReviews = async (serviceId: string): Promise<Reviews[] | null> => {
  return await prisma.reviews.findMany({
    where: {
      serviceId: serviceId,
    },
  });
};

const updateReview = async (
  reviewId: string,
  userId: string,
  reviewData: Reviews
): Promise<Reviews | null> => {
  const findReview = await prisma.reviews.findFirst({
    where: {
      id: reviewId,
    },
  });

  if (findReview?.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }

  return await prisma.reviews.update({
    where: {
      id: reviewId,
    },
    data: reviewData,
  });
};

const deleteReview = async (
  reviewId: string,
  userId: string
): Promise<Reviews | null> => {
  const findReview = await prisma.reviews.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (findReview?.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }

  return await prisma.reviews.delete({
    where: {
      id: reviewId,
    },
  });
};

export const ReviewService = {
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
