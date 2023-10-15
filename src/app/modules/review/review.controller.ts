import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await ReviewService.addReview(userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review added Successfully',
    data: result,
  });
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getAllReviews(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review fetched Successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { id } = req.params;
  const result = await ReviewService.updateReview(id, userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review updated Successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { id } = req.params;
  const result = await ReviewService.deleteReview(id, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review deleted Successfully',
    data: result,
  });
});

export const ReviewController = {
  addReview,
  getAllReview,
  updateReview,
  deleteReview,
};
