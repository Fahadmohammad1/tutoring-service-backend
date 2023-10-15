import { bookingStatus } from '@prisma/client';

export type ITimeSlot = {
  userId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type IBooking = {
  status: bookingStatus;
  userId: string;
  serviceId: string;
  timeSlotId: string;
  timeSlots: ITimeSlot;
};
