import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.TEACHER,
    ENUM_USER_ROLE.GUARDIAN,
    ENUM_USER_ROLE.SUPER_ADMIN
  )
);

router.get(
  '/all-bookings',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.getAllBookings
);

router.post(
  '/create-booking',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.GUARDIAN),
  BookingController.createBooking
);
router.patch(
  '/update-timeSlot/:bookingId',
  auth(ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.ADMIN),
  BookingController.updateBookingTimeSlot
);

router.patch(
  '/update-booking/:id',
  auth(ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.ADMIN),
  BookingController.updateBooking
);
router.delete(
  '/delete-booking/:id',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.GUARDIAN, ENUM_USER_ROLE.ADMIN),
  BookingController.cancelBooking
);

export const BookingRoutes = router;
