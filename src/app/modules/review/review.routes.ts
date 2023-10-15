import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/add-review',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.GUARDIAN),
  ReviewController.createBooking
);

export const ReviewRoutes = router;
