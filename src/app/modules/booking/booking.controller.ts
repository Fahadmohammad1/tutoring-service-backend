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

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings fetched Successfully',
    data: result,
  });
});
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await BookingService.getMyBookings(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking fetched Successfully',
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

const updateBookingTimeSlot = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;
    const { bookingId } = req.params;

    const result = await BookingService.updateBookingTimeSlot(
      user,
      bookingId,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking Timeslot Updated',
      data: result,
    });
  }
);
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
  getAllBookings,
  getMyBookings,
  cancelBooking,
  updateBooking,
  updateBookingTimeSlot,
};
