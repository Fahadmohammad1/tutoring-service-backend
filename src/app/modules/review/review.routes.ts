import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/add-review',
  auth(ENUM_USER_ROLE.STUDENT),
  validateRequest(ReviewValidation.addReview),
  ReviewController.addReview
);

router.patch(
  '/update-review/:id',
  auth(ENUM_USER_ROLE.STUDENT),
  ReviewController.updateReview
);

router.delete(
  '/delete-review/:id',
  auth(ENUM_USER_ROLE.STUDENT),
  ReviewController.deleteReview
);

export const ReviewRoutes = router;
