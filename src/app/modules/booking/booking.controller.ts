import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
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

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { id } = req.params;

  const result = await BookingService.cancelBooking(user, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking Cancelled',
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { id } = req.params;

  const result = await BookingService.updateBooking(user, id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking Updated',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  cancelBooking,
  updateBooking,
};
