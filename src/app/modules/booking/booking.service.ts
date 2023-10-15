import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBooking = async (bookingData: Booking): Promise<Booking | null> => {
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

const getMyBookings = async (userId: string) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  return await prisma.booking.findMany({
    where: {
      userId: userId,
    },
  });
};

const cancelBooking = async (
  user: JwtPayload,
  bookingId: string
): Promise<Booking | null> => {
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
): Promise<Booking | null> => {
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
  getMyBookings,
  cancelBooking,
  updateBooking,
};
