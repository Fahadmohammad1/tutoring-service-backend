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

export const BookingRoutes = router;
