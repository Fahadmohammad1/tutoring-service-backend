import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/create-booking',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.GUARDIAN),
  BookingController.createBooking
);
router.patch(
  '/update-booking/:id',
  auth(ENUM_USER_ROLE.TEACHER),
  BookingController.updateBooking
);
router.delete(
  '/delete-booking/:id',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.GUARDIAN),
  BookingController.cancelBooking
);

export const BookingRoutes = router;
