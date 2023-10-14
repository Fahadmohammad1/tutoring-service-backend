import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking Successfull',
    data: result,
  });
});

export const BookingController = {
  createBooking,
};
