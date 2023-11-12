import { Booking, TimeSlots } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ITimeSlot } from './booking.interface';

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

const getAllBookings = async () => {
  return await prisma.booking.findMany({});
};

const getMyBookings = async (userId: string) => {
  console.log(userId);
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

const updateBookingTimeSlot = async (
  user: JwtPayload,
  bookingId: string,
  data: Partial<ITimeSlot>
): Promise<TimeSlots | null> => {
  const findBooking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
      timeSlots: true,
    },
  });

  if (
    user.role !== 'admin' &&
    user.email !== findBooking?.service.authorEmail
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }

  return await prisma.timeSlots.update({
    where: {
      id: findBooking?.timeSlots.id,
    },
    data,
  });
};

const updateBooking = async (
  user: JwtPayload,
  bookingId: string,
  bookingData: Partial<Booking>
): Promise<Booking | null> => {
  const findBooking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
    },
  });

  if (
    user.role !== 'admin' &&
    user.email !== findBooking?.service.authorEmail
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
  }

  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: bookingData,
  });
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking,
  updateBooking,
  updateBookingTimeSlot,
};
