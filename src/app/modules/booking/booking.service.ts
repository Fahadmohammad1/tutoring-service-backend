import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBooking = async (bookingData: Booking) => {
  if (!bookingData.userId && !bookingData.serviceId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to book service');
  }

  return await prisma.booking.create({
    data: bookingData,
  });
};

export const BookingService = {
  createBooking,
};
