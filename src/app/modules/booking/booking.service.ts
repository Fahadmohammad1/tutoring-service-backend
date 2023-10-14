import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBooking = async (bookingData: Booking) => {
  if (!bookingData.userId && !bookingData.serviceId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to book service');
  }

  return await prisma.booking.create({
    data: bookingData,
    include: {
      user: true,
      service: true,
      timeSlots: true,
    },
  });
};

const cancelBooking = async (user: JwtPayload, bookingId: string) => {
  const findBooking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (user.userId !== findBooking?.userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }

  return await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
};

const updateBooking = async (
  user: JwtPayload,
  bookingId: string,
  bookingStatus: Partial<Booking>
) => {
  const findBooking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
    },
  });

  if (user.email !== findBooking?.service.authorEmail) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }

  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: bookingStatus.status,
    },
  });
};

export const BookingService = {
  createBooking,
  cancelBooking,
  updateBooking,
};
