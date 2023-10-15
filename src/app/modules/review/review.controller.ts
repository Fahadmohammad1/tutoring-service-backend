import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await ReviewService.addReview(userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review added Successfully',
    data: result,
  });
});

export const ReviewController = {
  createBooking,
};
